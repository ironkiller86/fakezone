import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";



export default component$(() => {
  return (
    <>
      <h1 class='text-green-700'>starter</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Fakezone",
  meta: [
    {
      name: "description",
      content: "fakezone is a  bad ugly and minimal clone of a famous e-commerce",
    },
  ],
};
