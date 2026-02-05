// scripts/normalize-products.js
// node scripts/normalize-products.js
import fs from "fs";
const products = JSON.parse(fs.readFileSync("./src/data/products_normalized.json", "utf8"));
const categories = JSON.parse(fs.readFileSync("./src/data/categories.json", "utf8"));

// build map name -> id (fallback to slug)
const nameToId = Object.fromEntries(categories.map(c => [c.name, c.id]));

const normalized = products.map(p => ({
  ...p,
  categoryId: p.category && nameToId[p.category] ? nameToId[p.category] : (p.category || "sin-categoria")
}));

fs.writeFileSync("./src/data/products_normalized.json", JSON.stringify(normalized, null, 2));
console.log("Normalized products written. Now update Product type to use categoryId.");
