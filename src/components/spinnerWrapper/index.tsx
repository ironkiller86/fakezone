import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => (
  <div class="h-screen w-screen absolute z-10 bg-white opacity-40 flex items-center justify-center">
    <Slot />
  </div>
));
