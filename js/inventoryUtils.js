// inventoryUtils.js
// Utility module: reusable functions for searching, filtering, and
// calculating values from the product inventory. No DOM access here —
// this module only works with data.

/**
 * Search products by name (case-insensitive, partial match).
 * @param {Array} products
 * @param {string} query
 * @returns {Array}
 */
export function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();
  return products.filter(({ name }) =>
    name.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Filter products by category. "All" returns every product.
 * @param {Array} products
 * @param {string} category
 * @returns {Array}
 */
export function filterProductsByCategory(products, category) {
  if (category === "All") {
    return products;
  }
  return products.filter((product) => product.category === category);
}

/**
 * Return the stock-status label for a given stock quantity.
 * 0 -> "Out of Stock", 1-5 -> "Low Stock", 6+ -> "In Stock".
 * @param {number} stock
 * @returns {string}
 */
export function getStockStatus(stock) {
  if (stock === 0) {
    return "Out of Stock";
  }
  if (stock >= 1 && stock <= 5) {
    return "Low Stock";
  }
  return "In Stock";
}

/**
 * Calculate the total inventory value (price * stock, summed).
 * @param {Array} products
 * @returns {number}
 */
export function calculateTotalInventoryValue(products) {
  return products.reduce((total, { price, stock }) => total + price * stock, 0);
}

/**
 * Count products with stock from 1 to 5 (inclusive).
 * @param {Array} products
 * @returns {number}
 */
export function countLowStockProducts(products) {
  return products.filter(({ stock }) => stock >= 1 && stock <= 5).length;
}

/**
 * Count products with stock equal to 0.
 * @param {Array} products
 * @returns {number}
 */
export function countOutOfStockProducts(products) {
  return products.filter(({ stock }) => stock === 0).length;
}