import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <footer class="bg-[#232F3E] p-5 text-center text-lg text-white flex justify-center gap-2 fixed bottom-0 w-full">
      <p>Make by</p>
      <Link class="hover:text-[#febd69]  font-semibold" href="https://www.donatotuzzolino.dev" target="_blank">Tuzzolino Donato</Link>
    </footer>
  );
});
