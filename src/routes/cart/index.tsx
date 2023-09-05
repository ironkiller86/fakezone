import { component$, useContext, $, useComputed$ } from "@builder.io/qwik";
import { CTX } from "~/components/context";
import Button from "~/components/button";
import CartResumeItem from "~/components/cartResumeItem";

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
    <main class="flex flex-col m-auto w-[80%] mt-32 mb-3 px-5 py-7 sm:flex sm:flex-row gap-6 sm:min-w-[50rem]">
      <div class="w-full  bg-white p-5">
        <p class=" text-[#0F1111] font-medium leading-7 text-[1.8rem]">
          Carrello
        </p>
        <div class="border-t-[1px] border-gray-200 w-full my-2" />
        {ctxObj.cart.map((itemCart) => (
          <>
            <CartResumeItem
              itemCart={itemCart}
              editItemQty={editItemQty}
              removeItem={removeItem}
            />
            <div class="border-t-[1px] border-gray-200 w-full mt-6" />
          </>
        ))}
        <div class="flex justify-end items-center gap-2 text-lg my-2">
          <p class="font-medium">
            Totale provvisorio ({ctxObj.cart.length}
            {ctxObj.cart.length > 1 ? " articoli" : " articolo"})
          </p>
          <p class="font-bold">{totalCartAmount.value.toFixed(2)} $</p>
        </div>
      </div>
      <div class="min-w-[20rem] mb-10 sm:mt-0 bg-white flex flex-col h-[8.5rem] p-5 ">
        <p class="text-lg max-w-[12rem] font-semibold mb-2">
          {`Totale provvisorio (${ctxObj.cart.length} ${
            ctxObj.cart.length > 1 ? " articoli" : " articolo"
          }): `}
          <span class="font-bold">{totalCartAmount.value.toFixed(2)} $</span>
        </p>

        <Button label="Procedi all`ordine" action={confirmOrder} />
      </div>
    </main>
  );
});
