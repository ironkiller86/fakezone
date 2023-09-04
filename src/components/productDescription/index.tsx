import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import type { Product } from "~/types";

type ProductDescriptionProps = {
  product: Product;
};

export default component$<ProductDescriptionProps>(({ product }) => {
  return (
    <>
      <div class="">
        <Image
          src={product.image}
          layout="fixed"
          width={600}
          height={300}
          alt="A lovely bath"
          class="max-h-[18rem] object-contain min-w-[30rem]"
        />
      </div>
      <div class="flex h-full py-4">
        <div class=" min-w-[18rem] max-w-lg p-4 flex flex-col  bg-gray-300 rounded-md ">
          <p class="text-center text-[#0F1111] font-semibold leading-7 text-[1.5rem]">
            {product.title}
          </p>
          <p class="text-[#0F1111] font-medium  text-base mt-auto">
            {product.description}
          </p>
          <div class="flex flex-col mt-auto">
            <p class="text-[#0F1111] font-semibold text-2xl">
              {product.price} $
            </p>
            <div class="border-t-[1px] border-gray-200 w-full my-2" />
            <div class="text-[#0F1111] font-medium text-base">
              <p>Rating {product.rating.rate}</p>
              <p>Qt: {product.rating.count} pz</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
