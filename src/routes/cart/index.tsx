import { component$, useContext } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import { CTX } from "~/components/context";

export default component$(() => {
  const ctxObj = useContext(CTX);
  return (
    <main class="m-auto w-[80%] mt-36 mb-3 bg-white px-5 py-7">
      <p>Carrello</p>
      <div class="border-t-[1px] border-gray-200 w-full my-2" />
      {ctxObj.cart.map((itemCart) => (
        <>
        <section key={itemCart.id} class="flex">
          <Image
            src={itemCart.image || ""}
            layout="fixed"
            width={400}
            height={300}
            alt="product-image"
            class="max-h-[15rem] object-contain min-w-[20rem]"
          />
          <div class="bg-green-300  w-full">info</div>
        </section>
        <div class="border-t-[1px] border-gray-200 w-full mt-6" />
        </>
      ))}
    </main>
  );
});
