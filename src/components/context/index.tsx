import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import type { Store } from "~/types";

export const CTX = createContextId<Store>("global");

export default component$(() => {
  const globalData = useStore<Store>(
    {
      allCategory: [],
      products: [],
      isLoading: false,
    }
    /*    { deep: false } */
  );
  useContextProvider(CTX, globalData);
  return <Slot />;
});
