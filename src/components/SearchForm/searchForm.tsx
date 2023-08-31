import { component$, useContext, useStore, $ } from "@builder.io/qwik";
import { HiMagnifyingGlassMini } from "@qwikest/icons/heroicons";
import { CTX } from "../context";
import type { SearchedField } from "~/types";

/* import { server$ } from '@builder.io/qwik-city'; */

export default component$(() => {
  const contextData = useContext(CTX);
  const formData = useStore<SearchedField>({ category: "", productName: "" });

  const handlerSearchField = $((evt: Event) => {
    formData.productName = (evt.target as HTMLInputElement).value;
  });
  const handlerSelectCategory = $((evt: Event) => {
    formData.category = (evt.target as HTMLInputElement).value;
  });

  return (
    <form
      preventdefault:submit
      onsubmit$={async () => {
        console.log(formData);
        contextData.isLoading = true;
        let res;
        if (formData.category === "All category") {
          res = await fetch(
            `http://localhost:3000/products?q=${formData.productName}`
          );
        } else {
          res = await fetch(
            `http://localhost:3000/products?q=${
              formData.productName
            }&category=${
              formData.category === "All category" ? "" : formData.category
            }`
          );
        }
        const data = await res.json();
        console.log("onsubmit", data);
        contextData.products = data;
        contextData.isLoading = false
      }}
      class="flex  gap-2 text-black h-10 w-full rounded-sm"
    >
      <select
        onInput$={handlerSelectCategory}
        class="rounded-sm  focus:outline-[#febd69] outline-offset-1 outline-1 font- "
      >
        <option selected value={"All category"}>
          All category
        </option>
        {contextData.allCategory.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        onInput$={handlerSearchField}
        value={formData.productName}
        name="productName"
        placeholder="Ricerca Fakezone.it"
        class="w-full rounded-sm focus:outline-[#febd69] outline-offset-1 outline-1 px-2 font-[500] text-lg"
      />
      <button
        class="text-white bg-[#febd69] w-12 flex items-center justify-center rounded-sm hover:opacity-95 active:scale-125"
        type="submit"
      >
        <HiMagnifyingGlassMini style={{ height: "1.5rem", width: "1.5rem" }} />
      </button>
    </form>
  );
});
