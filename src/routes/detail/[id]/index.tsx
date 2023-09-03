import { Resource, component$, useContext, useSignal } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import SpinnerWrapper from "~/components/spinnerWrapper";

import type { Product } from "~/types";
import { CTX } from "~/components/context";

export const useProductDetails = routeLoader$(async (requestEvent) => {
  console.log("useProductDetails", requestEvent.params);
  const res = await fetch(
    `http://localhost:3000/products/${requestEvent.params.id}`
  );
  const product = await res.json();
  console.log(product);
  return product as Product;
});

export const QUANTITY = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

/* export const useAddCart = routeAction$(async (data) => {
  console.log("useAddCart", data);
  const res = await fetch(`http://localhost:3000/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.data),
  });
  console.log(res);

});
 */
export default component$(() => {
  const product = useProductDetails();
  const ctxObj = useContext(CTX);
  const qt = useSignal("1");

  /*   useVisibleTask$(() => {
    console.log(">>>>>>>>>>>>>>", product.value);
  }); */
  return (
    <section class="mt-20 mb-3 flex items-center justify-center">
      <main class="m-auto w-[80%]  flex flex-wrap gap-3 mt-20 mb-3 justify-center">
        <Resource
          value={product}
          onPending={() => (
            <SpinnerWrapper>
              <div class="w-12 h-12 rounded-full animate-spin border-3 border-solid border-blue-500 border-t-transparent" />
            </SpinnerWrapper>
          )}
          onRejected={() => <p>error</p>}
          onResolved={(product) => (
            <section class="mt-16 flex gap-2  items-center bg-white min-h-[30rem] rounded-md px-2">
              <div class="">
                <Image
                  src={product.image}
                  layout="fixed"
                  width={600}
                  height={300}
                  alt="A lovely bath"
                  class="max-h-[18rem] object-contain min-w-[30rem]"
                />
              </div>
              <div class="flex h-full py-4">
                <div class=" min-w-[18rem] max-w-lg p-4 flex flex-col  bg-gray-300 rounded-md ">
                  <p class="text-center text-[#0F1111] font-semibold leading-7 text-[1.5rem]">
                    {product.title}
                  </p>
                  <p class="text-[#0F1111] font-medium  text-base mt-auto">
                    {product.description}
                  </p>
                  <div class="flex flex-col mt-auto">
                    <p class="text-[#0F1111] font-semibold text-2xl">
                      {product.price} $
                    </p>
                    <div class="border-t-[1px] border-gray-200 w-full my-2" />
                    <div class="text-[#0F1111] font-medium text-base">
                      <p>Rating {product.rating.rate}</p>
                      <p>Qt: {product.rating.count} pz</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex h-full py-4">
                <div class=" min-w-[15rem] flex flex-col border-[1px] rounded-md border-gray-200 p-4">
                  <p class="text-[#0F1111] font-bold text-base">Nuovo:</p>
                  <p class="text-[#0F1111] font-semibold text-2xl mt-1">
                    {product.price} $
                  </p>
                  <p class="text-[#007185] font-semibold text-sm mt-3">
                    Resi GRATUITI
                  </p>
                  <p class="mt-3">Consegna senza costi aggiuntivi</p>
                  <Link
                    class="text-[#007185] font-semibold text-sm mt-3 hover:underline
                    "
                    href="#"
                  >
                    Maggiori informazioni
                  </Link>
                  <p class="mt-6 text-[#007600] font-semibold text-lg">
                    Disponibilità Immediata
                  </p>
                  <div /* action={action} */ class="mt-4 flex flex-col h-full">
                    <div class="flex gap-3 items-center">
                      <p>Quantità:</p>
                      <select bind:value={qt} class="border-[1px] w-10">
                        {QUANTITY.map((qt) => (
                          <option key={qt}>{qt}</option>
                        ))}
                      </select>
                    </div>
                    <div class="flex flex-col mt-auto">
                      <button
                        onClick$={() =>
                          ctxObj.cart.push({
                            ...product,
                            qt: parseInt(qt.value),
                          })
                        }
                        class="justify-self-center bg-[#febd69] py-2 rounded-xl mt-4 hover:opacity-90 active:outline outline-2 outline-blue-400 outline-offset-2"
                      >
                        Aggiungi al Carrello
                      </button>
                      <div class="flex gap-5 mt-10 text-xs ">
                        <p class="text-gray-500  min-w-[4rem]">Pagamento</p>
                        <p class="text-[#007185] ">Transazione sicura</p>
                      </div>
                      <div class="flex gap-5 text-xs mt-1">
                        <p class="text-gray-500  min-w-[4rem]">Spedizione</p>
                        <p>Fakezone</p>
                      </div>
                      <div class="flex gap-5 text-xs mt-1">
                        <p class="text-gray-500  min-w-[4rem]">Venditore</p>
                        <p>Fakezone</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        />
      </main>
    </section>
  );
});
