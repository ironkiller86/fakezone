import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import { QUANTITY } from "~/routes/detail/[id]";
import type { Cart } from "~/types";

type CartItemProps = {
  itemCart: Cart;
  removeItem: PropFunction<(id: number) => void>;
  editItemQty: PropFunction<(event: Event, productId: number) => void>;
};

export default component$<CartItemProps>(
  ({ itemCart, removeItem, editItemQty }) => {
    return (
      <section class="flex flex-col  sm:flex sm:items-center sm:flex-row gap-4">
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
          <p class="text-lg text-[#0F1111] font-medium">{itemCart.title}</p>
          <p class="text-lg text-[#0F1111] font-semibold">{itemCart.price} $</p>
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
            <p class="text-[#007185] font-semibold">Ulteriori informazioni</p>
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
    );
  }
);
