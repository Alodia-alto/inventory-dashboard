// inventoryUtils.js
// Utility module: reusable functions for searching, filtering,
// and calculating inventory statistics.

/**
 * Search products by name (case-insensitive).
 * @param {Array} products
 * @param {string} query
 * @returns {Array} matching products
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
 * @returns {Array} filtered products
 */
export function filterProductsByCategory(products, category) {
  if (category === "All") {
    return products;
  }
  return products.filter(({ category: productCategory }) => productCategory === category);
}

/**
 * Determine the stock-status label for a given stock quantity.
 * @param {number} stock
 * @returns {string} "Out of Stock" | "Low Stock" | "In Stock"
 */
export function getStockStatus(stock) {
  if (stock === 0) {
    return "Out of Stock";
  } else if (stock >= 1 && stock <= 5) {
    return "Low Stock";
  }
  return "In Stock";
}

/**
 * Calculate the total inventory value (price x stock, summed).
 * @param {Array} products
 * @returns {number} raw numeric total
 */
export function calculateTotalInventoryValue(products) {
  return products.reduce((total, { price, stock }) => total + price * stock, 0);
}

/**
 * Count how many products are low stock (1-5 units).
 * @param {Array} products
 * @returns {number}
 */
export function countLowStockProducts(products) {
  return products.filter(({ stock }) => stock >= 1 && stock <= 5).length;
}

/**
 * Count how many products are out of stock (0 units).
 * @param {Array} products
 * @returns {number}
 */
export function countOutOfStockProducts(products) {
  return products.filter(({ stock }) => stock === 0).length;
}