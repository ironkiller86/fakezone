import { component$, useSignal, $, useTask$, } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import Button from "../button";
import { QUANTITY } from "~/routes/detail/[id]";
import type { Cart, Product } from "~/types";

type ProductInfoProps = {
  product: Product;
  cart: Cart[];
  addProduct: PropFunction<(qt: string) => void>;
};

export default component$<ProductInfoProps>(({ product, cart, addProduct }) => {
  const qt = useSignal("1");
  const nav = useNavigate();

  useTask$(() => {
    const index = cart.findIndex((itemCart) => itemCart.id === product.id);
    if (index !== -1) {
      qt.value = cart[index].qt.toString();
    }
  });
  return (
    <div class="flex h-full py-4">
      <div class=" min-w-[15rem] flex flex-col border-[1px] rounded-md border-gray-200 p-4">
        <p class="text-[#0F1111] font-bold text-base">Nuovo:</p>
        <p class="text-[#0F1111] font-semibold text-2xl mt-1">
          {product.price} $
        </p>
        <p class="text-[#007185] font-semibold text-sm mt-3">Resi GRATUITI</p>
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
        <div class="mt-4 flex flex-col h-full">
          <div class="flex gap-3 items-center">
            <p>Quantità:</p>
            <select bind:value={qt} class="border-[1px] w-10">
              {QUANTITY.map((qt) => (
                <option
                  selected={cart[product.id]?.qt === parseFloat(qt)}
                  value={qt}
                  key={qt}
                >
                  {qt}
                </option>
              ))}
            </select>
          </div>
          <div class="flex flex-col mt-auto">
            <Button
              label="Aggiungi al Carrello"
              action={$(() => {
                addProduct(qt.value);
                nav('/')
              })}
            />
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
  );
});
