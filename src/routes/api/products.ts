import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ json }) => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  console.log("onGet", res);
  json(200, { hello: "world" });
};
