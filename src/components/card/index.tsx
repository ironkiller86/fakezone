import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import type { Product } from "~/types";

type ProductCard = Omit<Product, "description" | "category">;

export default component$<ProductCard>(
  ({ id, title, image, price, rating }) => (
    <div class="w-[18rem] bg-white border border-gray-200 rounded-md flex flex-col p-3 hover:scale-105">
      <div>
        <Link href={`/detail/${id}`}>
          <Image
            src={image}
            layout="fixed"
            width={400}
            height={300}
            alt="A lovely bath"
            class="h-[15rem] object-contain"
          />
        </Link>
      </div>
      <Link href={`/detail/${id}`}>
        <p class="text-center text-[#0F1111] font-semibold text-base  hover:text-[#E67A00] mt-2">
          {title}
        </p>
      </Link>
      <div class="flex flex-col mt-auto">
        <p class="text-[#0F1111] font-bold text-2xl mt-2">{price} $</p>
        <div class="text-[#565959] font-normal text-lg  ">
          <p>Rating {rating.rate}</p>
          <p>Qt: {rating.count} pz</p>
        </div>
      </div>
    </div>
  )
);
