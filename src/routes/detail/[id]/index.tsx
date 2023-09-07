import {
  Resource,
  component$,
  useContext,
  $,
  useComputed$,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import SpinnerWrapper from "~/components/spinnerWrapper";

import type { Product } from "~/types";
import { CTX } from "~/components/context";

import ProductInfo from "~/components/productInfo";
import ProductDescription from "~/components/productDescription";
import { useEcommerceData } from "~/routes/layout";

/* export const useProductDetails = routeLoader$(async (requestEvent) => {
  const res = await fetch(
    `http://localhost:3000/products/${requestEvent.params.id}`
  );
  const product = await res.json();

  return product as Product;
}); */
export const useProductDetails = routeLoader$(async (requestEvent) => {
/*   const res = await fetch(`http://localhost:5173/api/store`); */
  const data = await requestEvent.resolveValue(useEcommerceData);
  console.log("data", data);
  /* const store = await res.json(); */
  const products: Product[] = /* store.response.products */data.products;
  const product = products.find(
    (product) => product.id === parseInt(requestEvent.params.id)
  );

  return product as Product;
});

export const QUANTITY = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default component$(() => {
  const product = useProductDetails();
  const ctxObj = useContext(CTX);
  const cart = ctxObj.cart;

  const addProduct = $((qt: string) => {
    ctxObj.cart.push({
      ...product.value,
      qt: parseInt(qt),
    });
  });

  const viewOnly = useComputed$(() => {
    const index = cart.findIndex(
      (itemCart) => itemCart.id === product.value.id
    );
    if (index !== -1) {
      return true;
    }
    return false;
  });

  return (
    <section class="mt-20 mb-3 flex items-center justify-center">
      <main class="mb-20 m-auto w-[80%]  flex flex-wrap gap-3 mt-20 sm:mb-3 justify-center ">
        <Resource
          value={product}
          onPending={() => (
            <SpinnerWrapper>
              <div class="w-12 h-12 rounded-full animate-spin border-3 border-solid border-blue-500 border-t-transparent" />
            </SpinnerWrapper>
          )}
          onRejected={() => <p>error</p>}
          onResolved={(product) => (
            <section class=" flex-col mt-16 flex sm:flex-row gap-2  items-center bg-white min-h-[30rem] rounded-md px-2 relative ">
              {viewOnly.value && (
                <div class="absolute left-0 top-0 h-full w-full bg-white opacity-40 hover:cursor-not-allowed" />
              )}
              <ProductDescription product={product} />
              <ProductInfo
                product={product}
                cart={cart}
                addProduct={addProduct}
              />
            </section>
          )}
        />
      </main>
    </section>
  );
});
