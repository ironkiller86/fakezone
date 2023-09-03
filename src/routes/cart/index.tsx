import { component$, useContext, $, useComputed$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import { CTX } from "~/components/context";
import { QUANTITY } from "../detail/[id]";
import Button from "~/components/Button";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  const ctxObj = useContext(CTX);

  const totalCartAmount = useComputed$(() =>
    ctxObj.cart.reduce((accumulator, currentValue) => {
      const totalPrice = parseFloat(currentValue.price) * currentValue.qt;
      return accumulator + totalPrice;
    }, 0)
  );

  const removeItem = $((id: number) => {
    ctxObj.cart = ctxObj.cart.filter((currentCart) => currentCart.id !== id);
  });

  const editItemQty = $((event: Event, productId: number) => {
    console.log((event.target as HTMLInputElement).value);
    const newProductQty = (event.target as HTMLInputElement).value;
    ctxObj.cart.map((item) => {
      if (item.id === productId) {
        item.qt = parseInt(newProductQty);
      }
      return { item };
    });
  });

  const confirmOrder = $(() => console.log("fine"));

  return (
    <main class="m-auto w-[80%] mt-32 mb-3 px-5 py-7 flex gap-6 min-w-[50rem]">
      <div class="w-full  bg-white p-5">
        <p class=" text-[#0F1111] font-medium leading-7 text-[1.8rem]">
          Carrello
        </p>
        <div class="border-t-[1px] border-gray-200 w-full my-2" />
        {ctxObj.cart.map((itemCart) => (
          <>
            <section class="flex items-center gap-4">
              <Link key={itemCart.id} href={`/detail/${itemCart.id}`}>
                <Image
                  src={itemCart.image || ""}
                  layout="fixed"
                  width={400}
                  height={300}
                  alt="product-image"
                  class="max-h-[15rem] object-contain min-w-[20rem]"
                />
              </Link>
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
                    Ulteriori informazioni
                  </p>
                </div>
                <div class="flex gap-3 mt-3">
                  <select
                    onInput$={(evt: Event) => editItemQty(evt, itemCart.id)}
                    class="border-[1px] shadow-md bg-[#F0F2F2] border-[#D5D9D9] rounded-lg active: outline-none w-21 h-[1.813rem] text-sm px-2"
                  >
                    {QUANTITY.map((qt) => (
                      <option
                        value={qt}
                        selected={itemCart.qt === parseFloat(qt)}
                        key={qt}
                      >{`Q.tà: ${qt}`}</option>
                    ))}
                  </select>
                  <div class="border-r-[1px] my-[6px] border-gray-200" />
                  <button
                    onClick$={() => removeItem(itemCart.id)}
                    class="text-[#007185] text-sm hover:underline underline-offset-2"
                  >
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
          <p class="font-bold">{totalCartAmount} $</p>
        </div>
      </div>
      <div class="min-w-[20rem]  bg-white flex flex-col h-[8.5rem] p-5 ">
        <p class="text-lg max-w-[12rem] font-semibold mb-2">
          {`Totale provvisorio (${ctxObj.cart.length} ${
            ctxObj.cart.length > 1 ? " articoli" : " articolo"
          }): `}
          <span class="font-bold">{totalCartAmount} $</span>
        </p>

        <Button label="Procedi all`ordine" action={confirmOrder} />
      </div>
    </main>
  );
});
