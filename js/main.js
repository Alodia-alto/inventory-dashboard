// main.js
// Main module: wires everything together. Imports data, utility
// functions, and display functions, then coordinates events.

import { products } from "./products.js";
import {
  searchProducts,
  filterProductsByCategory,
  calculateTotalInventoryValue,
  countLowStockProducts,
  countOutOfStockProducts,
} from "./inventoryUtils.js";
import { displayProducts, displaySummary } from "./display.js";

// Required DOM elements
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

/**
 * Apply the current search query and category filter to the full
 * product list, then re-render the product cards.
 */
function updateProductView() {
  const query = searchInput.value;
  const category = categoryFilter.value;

  let result = filterProductsByCategory(products, category);
  result = searchProducts(result, query);

  displayProducts(result);
}

/**
 * Recalculate and display the summary values (these always reflect
 * the full inventory, not the filtered view).
 */
function updateSummary() {
  displaySummary({
    total: calculateTotalInventoryValue(products),
    lowStock: countLowStockProducts(products),
    outOfStock: countOutOfStockProducts(products),
  });
}

function resetFilters() {
  searchInput.value = "";
  categoryFilter.value = "All";
  updateProductView();
}

searchBtn.addEventListener("click", updateProductView);
resetBtn.addEventListener("click", resetFilters);

// Allow pressing Enter in the search box to trigger a search
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    updateProductView();
  }
});

// Live filtering when the category dropdown changes
categoryFilter.addEventListener("change", updateProductView);

// Initial page load: show all products and the initial summary values
updateProductView();
updateSummary();