import { component$, useContext } from "@builder.io/qwik";
import { FakezoneLogo } from "../icons/cart";
import { Link } from "@builder.io/qwik-city";

import SearchForm from "~/components/SearchForm/searchForm";
import { CTX } from "~/components/context";

export default component$(() => {
  const ctxObj = useContext(CTX);
  return (
    <header class="bg-[#131921] text-white px-6 py-3 fixed w-full">
      <nav class="flex flex-row items-center gap-12">
        <Link href="/" title="qwik">
          <h1 class="font-bold text-2xl">Fakezone</h1>
        </Link>
        <SearchForm />
        <ul class="flex items-center font-[400] gap-10">
          <li>
            <Link href="https://qwik.builder.io/docs/components/overview/">
              <p class="text-sm font-semibold">Ciao Donato</p>
            </Link>
          </li>

          <li>
            <Link
              href="/cart"
              title="cart"
              class="flex  items-center justify-betweens font-semibold"
            >
              <div class="relative flex items-center">
                <p class="absolute left-[22px] top-[-10px] text-orange-400 text-md">
                  {ctxObj.cart.length}
                </p>
                <FakezoneLogo width={50} />
                <p>Carrello</p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});
