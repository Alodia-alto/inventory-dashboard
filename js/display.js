// display.js
// Display module: renders products and summary values to the webpage.

import {
  getStockStatus,
  calculateTotalInventoryValue,
  countLowStockProducts,
  countOutOfStockProducts,
} from "./inventoryUtils.js";

/**
 * Format a raw number as Philippine peso currency for display only.
 * @param {number} value
 * @returns {string}
 */
function formatCurrency(value) {
  return "₱" + value.toLocaleString("en-PH");
}

/**
 * Render the given products as product cards inside #productList.
 * Shows "No products found" when the result set is empty.
 * @param {Array} products
 */
export function displayProducts(products) {
  const productList = document.getElementById("productList");
  const noResultsMessage = document.getElementById("noResultsMessage");

  productList.innerHTML = "";

  if (products.length === 0) {
    noResultsMessage.textContent = "No products found";
    noResultsMessage.style.display = "block";
    return;
  }

  noResultsMessage.style.display = "none";
  noResultsMessage.textContent = "";

  products.forEach((product) => {
    const { id, name, category, price, stock } = product;
    const status = getStockStatus(stock);

    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = id;

    const statusClass = status.toLowerCase().replace(/\s+/g, "-");

    card.innerHTML = `
      <h3 class="product-name">${name}</h3>
      <p class="product-category">${category}</p>
      <p class="product-price">${formatCurrency(price)}</p>
      <p class="product-stock">Stock: ${stock}</p>
      <span class="stock-status ${statusClass}">${status}</span>
    `;

    productList.appendChild(card);
  });
}

/**
 * Display the total inventory value, low-stock count, and
 * out-of-stock count in their respective summary elements.
 * @param {Array} products
 */
export function displaySummary(products) {
  const totalInventoryValue = document.getElementById("totalInventoryValue");
  const lowStockCount = document.getElementById("lowStockCount");
  const outOfStockCount = document.getElementById("outOfStockCount");

  const total = calculateTotalInventoryValue(products);
  const lowStock = countLowStockProducts(products);
  const outOfStock = countOutOfStockProducts(products);

  totalInventoryValue.textContent = formatCurrency(total);
  lowStockCount.textContent = lowStock;
  outOfStockCount.textContent = outOfStock;
}