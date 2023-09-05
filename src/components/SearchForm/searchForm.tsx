import { component$, useContext, useStore, $ } from "@builder.io/qwik";
import { HiMagnifyingGlassMini } from "@qwikest/icons/heroicons";
import { CTX } from "../context";
import type { Product, SearchedField } from "~/types";
import { useLocation, useNavigate, server$ } from "@builder.io/qwik-city";

const searchData = server$(async (formData: SearchedField) => {
  const url = `http://localhost:5173/api/store?${
    formData.category ? `category=${formData.category}` : "category=allCategory"
  }${formData.productName ? `&productName=${formData.productName}` : ""} `;
  const res = await fetch(url);
  const data = await res.json();
  if (Array.isArray(data.response.products)) {
    return {
      products: data.response.products as Product[],
    };
  } else return { products: [] };
});

export default component$(() => {
  const contextData = useContext(CTX);
  const formData = useStore<SearchedField>({ category: "", productName: "" });
  const nav = useNavigate();
  const loc = useLocation();

  const handlerSearchField = $((evt: Event) => {
    formData.productName = (evt.target as HTMLInputElement).value;
  });
  const handlerSelectCategory = $((evt: Event) => {
    formData.category = (evt.target as HTMLInputElement).value;
  });

  const handlerSubmit = $(async () => {
    contextData.isLoading = true;
    const { products } = await searchData(formData);
    contextData.products = products;
    contextData.isLoading = false;
    if (loc.url.pathname !== "/") {
      nav("/");
    }
  });

  return (
    <form
      preventdefault:submit
      onsubmit$={handlerSubmit}
      class="flex  gap-2 text-black h-10 w-full rounded-sm"
    >
      <select
        onInput$={handlerSelectCategory}
        class="rounded-sm  focus:outline-[#febd69] outline-offset-1 outline-1 font- "
      >
        <option selected value={"allCategory"}>
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
