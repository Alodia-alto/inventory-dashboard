// main.js
// Main module: imports everything else and controls the flow of the app.
// No data definitions and no DOM rendering live here — this file only coordinates.

import { products } from "./products.js";
import {
  searchProducts,
  filterProductsByCategory,
  getStockStatus,
  calculateTotalInventoryValue,
  countLowStockProducts,
  countOutOfStockProducts
} from "./inventoryUtils.js";
import { displayProducts, displaySummary } from "./display.js";

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

/**
 * Apply the current search text and category filter to the full product list,
 * then re-render the product list and the summary values.
 *
 * The summary values (total value, low-stock count, out-of-stock count) are
 * always calculated from the FULL product list, not the filtered results —
 * the dashboard summary reflects the whole inventory regardless of what the
 * user is currently searching for.
 */
function renderDashboard() {
  const query = searchInput.value;
  const category = categoryFilter.value;

  const filteredByCategory = filterProductsByCategory(products, category);
  const visibleProducts = searchProducts(filteredByCategory, query);

  displayProducts(visibleProducts, getStockStatus);

  const totalValue = calculateTotalInventoryValue(products);
  const lowStockCount = countLowStockProducts(products);
  const outOfStockCount = countOutOfStockProducts(products);

  displaySummary(totalValue, lowStockCount, outOfStockCount);
}

function resetFilters() {
  searchInput.value = "";
  categoryFilter.value = "All";
  renderDashboard();
}

searchBtn.addEventListener("click", renderDashboard);
resetBtn.addEventListener("click", resetFilters);

// Let pressing Enter in the search box trigger a search too.
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    renderDashboard();
  }
});

// Initial page load: show all six products and the initial summary values.
renderDashboard();