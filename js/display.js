import { getStockStatus } from "./inventoryUtils.js";


// Display products
export function displayProducts(products) {

    const productList = document.getElementById("productList");
    const noResultsMessage = document.getElementById("noResultsMessage");

    // Clear old products
    productList.innerHTML = "";

    // If there are no products
    if (products.length === 0) {
        noResultsMessage.textContent = "No products found";
        noResultsMessage.style.display = "block";
        return;
    }

    // Hide no-results message
    noResultsMessage.style.display = "none";

    // Display every product
    products.forEach(product => {

        // Object destructuring
        const {
            id,
            name,
            category,
            price,
            stock
        } = product;

        const status = getStockStatus(stock);

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-icon">📦</div>

            <div class="product-info">
                <h3>${name}</h3>
                <p class="category">${category}</p>
                <p>Product ID: ${id}</p>
            </div>

            <div class="product-details">
                <p class="price">₱${price.toLocaleString()}</p>
                <p>Stock: ${stock}</p>
                <span class="status ${status
                    .toLowerCase()
                    .replaceAll(" ", "-")}">
                    ${status}
                </span>
            </div>
        `;

        productList.appendChild(card);
    });
}


// Display summary
export function displaySummary(products) {

    const totalInventoryValue =
        document.getElementById("totalInventoryValue");

    const lowStockCount =
        document.getElementById("lowStockCount");

    const outOfStockCount =
        document.getElementById("outOfStockCount");


    const totalValue = products.reduce(
        (total, product) =>
            total + (product.price * product.stock),
        0
    );

    const lowStock = products.filter(product =>
        product.stock >= 1 && product.stock <= 5
    ).length;

    const outOfStock = products.filter(product =>
        product.stock === 0
    ).length;


    totalInventoryValue.textContent =
        `₱${totalValue.toLocaleString()}`;

    lowStockCount.textContent = lowStock;

    outOfStockCount.textContent = outOfStock;
}