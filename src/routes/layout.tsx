import { component$, Slot, useContext, useTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";
import { CTX } from "../components/context";
import type { Product } from "~/types";
import SpinnerWrapper from "~/components/spinnerWrapper";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const useProducts = routeLoader$(async () => {
  console.log("useProducts");
  // This code runs only on the server, after every navigation
  const res = await fetch(`http://localhost:3000/products`);
  const products = await res.json();
  return products as Product[];
});
/* export const useCart = routeLoader$(async () => {
  console.log("useProducts");
  // This code runs only on the server, after every navigation
  const res = await fetch(`http://localhost:3000/cart`);
  const cart = await res.json();
  return cart as Product[];
}); */

export const useEcommerceData = routeLoader$(async (requestEvent) => {
  console.log("useEcommerceData");
  // This code runs only on the server, after every navigation
  const products = await requestEvent.resolveValue(useProducts);
  /*  const cart = await requestEvent.resolveValue(useCart); */
  const res = await fetch(`http://localhost:3000/allCategory`);
  const allCategories = await res.json();
  return {
    allCategories: allCategories as String[],
    products: products as Product[],
    /*  cart: cart as Product[], */
  };
});

export default component$(() => {
  const ctxObj = useContext(CTX);
  const data = useEcommerceData();
  /*  console.log("Products", data.value.allCategories); */
  const serializableCategories = [...data.value.allCategories].map((item) =>
    item.toString()
  );

  const products = data.value.products;
  console.log('cart:',ctxObj.cart);
  useTask$(async (/* { track } */) => {
    ctxObj.allCategory = serializableCategories;
    ctxObj.products = products;
  });

  return (
    <div class="bg-gray-300 flex flex-col min-h-screen relative">
      {ctxObj.isLoading && (
        <SpinnerWrapper>
          <div class="w-12 h-12 rounded-full animate-spin border-3 border-solid border-blue-500 border-t-transparent " />
        </SpinnerWrapper>
      )}
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
