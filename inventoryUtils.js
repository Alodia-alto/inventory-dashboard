// Search products by name
// Search is case-insensitive.

export function searchProducts(products, query) {

    const searchQuery =
        query.trim().toLowerCase();

    return products.filter(
        ({ name }) =>
            name
                .toLowerCase()
                .includes(searchQuery)
    );
}


// Filter products by category

export function filterProductsByCategory(
    products,
    category
) {

    if (category === "All") {
        return products;
    }

    return products.filter(
        ({ category: productCategory }) =>
            productCategory === category
    );
}


// Determine stock status

export function getStockStatus(stock) {

    if (stock === 0) {
        return "Out of Stock";
    }

    if (
        stock >= 1 &&
        stock <= 5
    ) {
        return "Low Stock";
    }

    return "In Stock";
}


// Calculate total inventory value

export function calculateTotalInventoryValue(
    products
) {

    return products.reduce(
        (
            total,
            { price, stock }
        ) => total + (price * stock),

        0
    );
}


// Count low-stock products

export function countLowStockProducts(
    products
) {

    return products.filter(
        ({ stock }) =>
            stock >= 1 &&
            stock <= 5
    ).length;
}


// Count out-of-stock products

export function countOutOfStockProducts(
    products
) {

    return products.filter(
        ({ stock }) =>
            stock === 0
    ).length;
}