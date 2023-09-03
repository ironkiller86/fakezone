import { component$, useContext } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import { CTX } from "~/components/context";
import { QUANTITY } from "../detail/[id]";

export default component$(() => {
  const ctxObj = useContext(CTX);
  return (
    <main class="m-auto w-[80%] mt-32 mb-3 px-5 py-7 flex gap-6 min-w-[50rem]">
      <div class="w-full  bg-white p-5">
        <p class=" text-[#0F1111] font-medium leading-7 text-[1.8rem]">
          Carrello
        </p>
        <div class="border-t-[1px] border-gray-200 w-full my-2" />
        {ctxObj.cart.map((itemCart) => (
          <>
            <section key={itemCart.id} class="flex items-center gap-4">
              <Image
                src={itemCart.image || ""}
                layout="fixed"
                width={400}
                height={300}
                alt="product-image"
                class="max-h-[15rem] object-contain min-w-[20rem]"
              />
              <div class="w-full  min-w-[20rem]">
                <p class="text-lg text-[#0F1111] font-medium">
                  {itemCart.title}
                </p>
                <p class="text-lg text-[#0F1111] font-semibold">
                  {itemCart.price} $
                </p>
                <p class="text-xs mt-1 text-[#007600] font-semibold">
                  Disponibità immediata
                </p>
                <div class="flex gap-1 mt-2 text-xs">
                  <p class="text-gray-500">Venduto da</p>
                  <p class="text-[#007185]  font-semibold">Fakezone</p>
                </div>
                <div class="flex gap-1 text-xs mt-1">
                  <p class="text-gray-500  min-w-[4rem]">
                    Le opzioni regalo non sono disponibili.
                  </p>
                  <p class="text-[#007185] font-semibold">
                    Uteriori informazioni
                  </p>
                </div>
                <div class="flex gap-3 mt-3">
                  <select
                    /*  bind:value={qt} */ class="border-[1px] shadow-md bg-[#F0F2F2] border-[#D5D9D9] rounded-lg active: outline-none w-20 h-[1.813rem] text-sm px-2"
                  >
                    {QUANTITY.map((qt) => (
                      <option key={qt}>{`Q.tà: ${qt}`}</option>
                    ))}
                  </select>
                  <div class="border-r-[1px] my-[6px] border-gray-200" />
                  <button class="text-[#007185] text-sm hover:underline underline-offset-2">
                    Rimuovi
                  </button>
                  <div class="border-r-[1px]  my-[6px] border-gray-200" />
                </div>
              </div>
            </section>
            <div class="border-t-[1px] border-gray-200 w-full mt-6" />
          </>
        ))}
        <div class="flex justify-end items-center gap-2 text-lg my-2">
          <p class="font-medium">
            Totale provvisorio ({ctxObj.cart.length}
            {ctxObj.cart.length > 1 ? " articoli" : " articolo"})
          </p>
          <p class="font-bold">800 $</p>
        </div>
      </div>
      <div class="min-w-[20rem]  bg-white flex flex-col h-[8rem] p-5 ">
        <p class="text-lg max-w-[12rem] font-semibold">
          {`Totale provvisorio (${ctxObj.cart.length} ${
            ctxObj.cart.length > 1 ? " articoli" : " articolo"
          }): `}<span class="font-bold">800 $</span>
        </p>

        <div>
       
          
        </div>

        <button class=''>Procedi</button>
      </div>
    </main>
  );
});
