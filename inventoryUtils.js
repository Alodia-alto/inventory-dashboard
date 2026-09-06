// ========================================
// SEARCH PRODUCTS
// ========================================

export function searchProducts(products, query) {

    const searchQuery =
        String(query)
            .trim()
            .toLowerCase();

    return products.filter(function (product) {

        const { name } = product;

        return name
            .toLowerCase()
            .includes(searchQuery);

    });

}


// ========================================
// FILTER BY CATEGORY
// ========================================

export function filterProductsByCategory(
    products,
    category
) {

    if (category === "All") {
        return products;
    }

    return products.filter(function (product) {

        const {
            category: productCategory
        } = product;

        return productCategory === category;

    });

}


// ========================================
// GET STOCK STATUS
// ========================================

export function getStockStatus(stock) {

    if (stock === 0) {
        return "Out of Stock";
    }

    if (stock >= 1 && stock <= 5) {
        return "Low Stock";
    }

    return "In Stock";

}


// ========================================
// CALCULATE TOTAL INVENTORY VALUE
// ========================================

export function calculateTotalInventoryValue(
    products
) {

    return products.reduce(
        function (total, product) {

            const {
                price,
                stock
            } = product;

            return total + (price * stock);

        },
        0
    );

}


// ========================================
// COUNT LOW-STOCK PRODUCTS
// ========================================

export function countLowStockProducts(
    products
) {

    return products.filter(
        function (product) {

            const { stock } = product;

            return (
                stock >= 1 &&
                stock <= 5
            );

        }
    ).length;

}


// ========================================
// COUNT OUT-OF-STOCK PRODUCTS
// ========================================

export function countOutOfStockProducts(
    products
) {

    return products.filter(
        function (product) {

            const { stock } = product;

            return stock === 0;

        }
    ).length;

}