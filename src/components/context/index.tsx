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
      cart: [
      /*   {
          qt: 1,
          id: 20,
          title: "DANVOUY Womens T Shirt Casual Cotton Short",
          price: "12.99",
          description:
            "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
          category: "women's clothing",
          image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
          rating: {
            rate: 3.6,
            count: 145,
          
          },
        }, */
      ],
      isLoading: false,
    }
    /*    { deep: false } */
  );
  useContextProvider(CTX, globalData);
  return <Slot />;
});
