// display.js
// Display module: the only place in the app that touches the DOM.
// It takes plain data (arrays and numbers) from main.js and renders it.

const productListEl = document.getElementById("productList");
const noResultsMessageEl = document.getElementById("noResultsMessage");
const totalInventoryValueEl = document.getElementById("totalInventoryValue");
const lowStockCountEl = document.getElementById("lowStockCount");
const outOfStockCountEl = document.getElementById("outOfStockCount");

/**
 * Format a raw number as Philippine peso currency for display only.
 * Calculation functions must keep returning raw numbers — formatting happens here.
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  return `₱${amount.toLocaleString("en-PH")}`;
}

/**
 * Build one product-card element for a single product.
 * @param {Object} product
 * @param {Function} getStockStatus
 * @returns {HTMLElement}
 */
function createProductCard(product, getStockStatus) {
  const { name, category, price, stock } = product;
  const status = getStockStatus(stock);
  const statusClass = status.toLowerCase().replace(/\s+/g, "-");

  const card = document.createElement("article");
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-card__header">
      <h3 class="product-card__name">${name}</h3>
      <span class="product-card__status product-card__status--${statusClass}">${status}</span>
    </div>
    <p class="product-card__category">${category}</p>
    <div class="product-card__details">
      <span class="product-card__price">${formatCurrency(price)}</span>
      <span class="product-card__stock">Stock: ${stock}</span>
    </div>
  `;

  return card;
}

/**
 * Render the given products into the product-list area.
 * Shows the "No products found" message when the array is empty.
 * @param {Array<Object>} products
 * @param {Function} getStockStatus - passed in so this module stays decoupled from inventoryUtils
 */
export function displayProducts(products, getStockStatus) {
  productListEl.innerHTML = "";

  if (products.length === 0) {
    noResultsMessageEl.style.display = "block";
    return;
  }

  noResultsMessageEl.style.display = "none";

  products.forEach((product) => {
    const card = createProductCard(product, getStockStatus);
    productListEl.appendChild(card);
  });
}

/**
 * Render the summary values: total inventory value, low-stock count, out-of-stock count.
 * @param {number} totalValue
 * @param {number} lowStockCount
 * @param {number} outOfStockCount
 */
export function displaySummary(totalValue, lowStockCount, outOfStockCount) {
  totalInventoryValueEl.textContent = formatCurrency(totalValue);
  lowStockCountEl.textContent = lowStockCount;
  outOfStockCountEl.textContent = outOfStockCount;
}