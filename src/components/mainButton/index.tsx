import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";

const style =
  "justify-self-center bg-[#febd69] py-2 rounded-xl hover:opacity-90 active:outline outline-2 outline-blue-400 outline-offset-2";

type ButtonProp = {
  label: string;
  action: PropFunction<() => void>;
};

export default component$<ButtonProp>(({ action, label }) => (
  <button onClick$={action} class={style}>
    {label}
  </button>
));
