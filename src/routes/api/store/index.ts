import { type RequestHandler } from "@builder.io/qwik-city";
import { readFileSync } from "fs";
import type { Product } from "~/types";

export const onGet: RequestHandler = async ({ json, query }) => {
  try {
    const data = readFileSync("db.json");
    const category = query.get("category") || "allCategory";
    const productName = query.get("productName")?.toLowerCase();
    const store = JSON.parse(data.toString());
    const productsData: Product[] = store.products;
    if (category !== "allCategory" && !productName) {
      const data = productsData.filter((productName) =>
        productName.category.toLowerCase().includes(category)
      );
      json(200, { response: { products: data } });
    } else if (category === "allCategory" && productName) {
      const data = productsData.filter(
        (product) =>
          product.title.toLowerCase().includes(productName) ||
          product.description.toLowerCase().includes(productName)
      );
      json(200, { response: { products: data } });
    } else if (category !== "allCategory" && productName) {
      const data = productsData.filter(
        (product) =>
          product.category.toLowerCase().includes(category) &&
          (product.description.toLowerCase().includes(productName) ||
            product.title.toLowerCase().includes(productName))
      );
      json(200, { response: { products: data } });
    } else {
      json(200, { response: JSON.parse(data.toString()) });
    }
  } catch (err) {
    json(500, { response: [] });
  }
};
