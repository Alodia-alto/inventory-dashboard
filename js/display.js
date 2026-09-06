// display.js
// Display module: everything that touches the DOM lives here.
// Renders product cards and updates the summary values on the page.

import { getStockStatus } from "./inventoryUtils.js";

/**
 * Format a number as Philippine peso currency for display only.
 * Calculation functions must keep returning raw numbers — formatting
 * happens here, at the point of display.
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  return `₱${amount.toLocaleString("en-PH")}`;
}

/**
 * Turn a stock-status label into a CSS-friendly modifier class.
 * "Out of Stock" -> "out-of-stock", "Low Stock" -> "low-stock", etc.
 * @param {string} status
 * @returns {string}
 */
function statusToClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Render the given products as product cards inside #productList.
 * Shows "No products found" when the array is empty.
 * @param {Array} products
 */
export function displayProducts(products) {
  const productList = document.getElementById("productList");
  const noResultsMessage = document.getElementById("noResultsMessage");

  productList.innerHTML = "";

  if (products.length === 0) {
    noResultsMessage.textContent = "No products found";
    noResultsMessage.hidden = false;
    return;
  }

  noResultsMessage.hidden = true;

  products.forEach((product) => {
    const { id, name, category, price, stock } = product;
    const status = getStockStatus(stock);

    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = id;

    card.innerHTML = `
      <h3 class="product-card__name">${name}</h3>
      <p class="product-card__category">${category}</p>
      <p class="product-card__price">${formatCurrency(price)}</p>
      <p class="product-card__stock">Stock: ${stock}</p>
      <span class="product-card__status product-card__status--${statusToClass(status)}">${status}</span>
    `;

    productList.appendChild(card);
  });
}

/**
 * Update the total inventory value summary field.
 * @param {number} total
 */
export function displayTotalInventoryValue(total) {
  document.getElementById("totalInventoryValue").textContent = formatCurrency(total);
}

/**
 * Update the low-stock count summary field.
 * @param {number} count
 */
export function displayLowStockCount(count) {
  document.getElementById("lowStockCount").textContent = count;
}

/**
 * Update the out-of-stock count summary field.
 * @param {number} count
 */
export function displayOutOfStockCount(count) {
  document.getElementById("outOfStockCount").textContent = count;
}

/**
 * Convenience helper: update all three summary fields at once.
 * @param {Object} summary
 * @param {number} summary.total
 * @param {number} summary.lowStock
 * @param {number} summary.outOfStock
 */
export function displaySummary({ total, lowStock, outOfStock }) {
  displayTotalInventoryValue(total);
  displayLowStockCount(lowStock);
  displayOutOfStockCount(outOfStock);
}