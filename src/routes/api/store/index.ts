import { type RequestHandler } from "@builder.io/qwik-city";
/* import fs from "fs"; */
import db from "../../../../db.json";
/* import type { Product } from "~/types"; */

export const onGet: RequestHandler = async ({ json, query }) => {
  try {
    /* const data = fs.readFileSync("db.json"); */
    const category = query.get("category") || "allCategory";
    const productName = query.get("productName")?.toLowerCase();
    console.log("db", db);
    /* const store = JSON.parse(data.toString()); */
    /*    const productsData: Product[] = ; */
    if (category !== "allCategory" && !productName) {
      const data = db.products.filter((productName) =>
        productName.category.toLowerCase().includes(category)
      );
      json(200, { response: { products: data } });
    } else if (category === "allCategory" && productName) {
      const data = db.products.filter(
        (product) =>
          product.title.toLowerCase().includes(productName) ||
          product.description.toLowerCase().includes(productName)
      );
      json(200, { response: { products: data } });
    } else if (category !== "allCategory" && productName) {
      const data = db.products.filter(
        (product) =>
          product.category.toLowerCase().includes(category) &&
          (product.description.toLowerCase().includes(productName) ||
            product.title.toLowerCase().includes(productName))
      );
      json(200, { response: { products: data } });
    } else {
      json(200, { response: db /*  JSON.parse(data.toString()) */ });
    }
  } catch (err) {
    json(500, { response: [] });
  }
};
