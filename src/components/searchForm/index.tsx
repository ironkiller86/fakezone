import { component$, useContext, useStore, $ } from "@builder.io/qwik";
import { HiMagnifyingGlassMini } from "@qwikest/icons/heroicons";
import { CTX } from "../context";
import type { Product, SearchedField } from "~/types";
import { server$, useLocation, useNavigate } from "@builder.io/qwik-city";

const searchData = server$(async (formData: SearchedField) => {
  const respProducts = await fetch(
    `https://fakezone-b76f4-default-rtdb.europe-west1.firebasedatabase.app//products.json`
  );
  const productsData: Product[] = await respProducts.json();
  try {
    const category = formData.category;
    const productName = formData.productName.toLowerCase();
    if (category !== "allCategory" && !productName) {
      const data = productsData.filter((productName) =>
        productName.category.toLowerCase().includes(category)
      );
      return data;
    } else if (category === "allCategory" && productName) {
      const data = productsData.filter(
        (product) =>
          product.title.toLowerCase().includes(productName) ||
          product.description.toLowerCase().includes(productName)
      );
      return data;
    } else if (category !== "allCategory" && productName) {
      const data = productsData.filter(
        (product) =>
          product.category.toLowerCase().includes(category) &&
          (product.description.toLowerCase().includes(productName) ||
            product.title.toLowerCase().includes(productName))
      );
      return data;
    } else {
      return productsData;
    }
  } catch (err) {
    return [];
  }
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
    const products = await searchData(formData);
    console.log("products", products);
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
