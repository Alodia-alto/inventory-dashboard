// main.js
// Main module: connects data, utilities, and display modules,
// and wires up user interaction.

import { products } from "./products.js";
import {
  searchProducts,
  filterProductsByCategory,
} from "./inventoryUtils.js";
import { displayProducts, displaySummary } from "./display.js";

// Required DOM elements
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

/**
 * Apply the current search text and category filter together,
 * then update the product list on screen.
 */
function applyFilters() {
  const query = searchInput.value;
  const category = categoryFilter.value;

  let result = filterProductsByCategory(products, category);
  result = searchProducts(result, query);

  displayProducts(result);
}

/**
 * Reset the search box and category filter, then show all products.
 */
function resetFilters() {
  searchInput.value = "";
  categoryFilter.value = "All";
  displayProducts(products);
}

// Event listeners
searchBtn.addEventListener("click", applyFilters);
resetBtn.addEventListener("click", resetFilters);

// Allow pressing Enter in the search box to trigger a search
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    applyFilters();
  }
});

// Optional: live filtering when the category dropdown changes
categoryFilter.addEventListener("change", applyFilters);

// Initial page load: show all products and the initial summary values
displayProducts(products);
displaySummary(products);