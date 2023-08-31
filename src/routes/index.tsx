import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Card from "~/components/card";
import { CTX } from "~/components/context";

export default component$(() => {
  const ctxObj = useContext(CTX);
  return (
    <>
      <main class="m-auto w-[80%] flex flex-wrap gap-3 ">
        {ctxObj.products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Fakezone",
  meta: [
    {
      name: "description",
      content:
        "fakezone is a  bad ugly and minimal clone of a famous e-commerce",
    },
  ],
};
