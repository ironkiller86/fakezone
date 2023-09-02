import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => (
  <div class="absolute z-10 top-0 left-0  bg-white opacity-40 flex items-center justify-center w-full h-full ">
    <Slot />
  </div>
));
