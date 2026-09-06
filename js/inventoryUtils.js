// Search products by name
export function searchProducts(products, query) {
    return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
}


// Filter products by category
export function filterProductsByCategory(products, category) {
    if (category === "All") {
        return products;
    }

    return products.filter(product =>
        product.category === category
    );
}


// Get stock status
export function getStockStatus(stock) {
    if (stock === 0) {
        return "Out of Stock";
    }

    if (stock >= 1 && stock <= 5) {
        return "Low Stock";
    }

    return "In Stock";
}


// Calculate total inventory value
export function calculateTotalInventoryValue(products) {
    return products.reduce(
        (total, product) => total + (product.price * product.stock),
        0
    );
}


// Count low-stock products
export function countLowStockProducts(products) {
    return products.filter(product =>
        product.stock >= 1 && product.stock <= 5
    ).length;
}


// Count out-of-stock products
export function countOutOfStockProducts(products) {
    return products.filter(product =>
        product.stock === 0
    ).length;
}