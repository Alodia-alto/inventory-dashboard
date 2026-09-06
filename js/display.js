import {
    getStockStatus,
    calculateTotalInventoryValue,
    countLowStockProducts,
    countOutOfStockProducts
} from "./inventoryUtils.js";


export function displayProducts(products) {

    const productList =
        document.getElementById("productList");

    const noResultsMessage =
        document.getElementById("noResultsMessage");

    const productCount =
        document.getElementById("productCount");


    // Clear current products

    productList.innerHTML = "";


    // No products found

    if (products.length === 0) {

        noResultsMessage.style.display = "block";

        productCount.querySelector("strong").textContent =
            "0 Products";

        return;
    }


    // Hide no-results message

    noResultsMessage.style.display = "none";


    // Update product count

    productCount.querySelector("strong").textContent =
        `${products.length} Products`;


    // Display products

    products.forEach(product => {

        // Object destructuring

        const {
            id,
            name,
            category,
            price,
            stock
        } = product;


        const status =
            getStockStatus(stock);


        const card =
            document.createElement("div");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-icon">
                📦
            </div>

            <div class="product-info">

                <h3>
                    ${name}
                </h3>

                <p class="category">
                    ${category}
                </p>

                <p>
                    Product ID: ${id}
                </p>

            </div>

            <div class="product-details">

                <p class="price">
                    ₱${price.toLocaleString()}
                </p>

                <p>
                    Stock: ${stock}
                </p>

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


export function displaySummary(products) {

    const totalInventoryValue =
        document.getElementById(
            "totalInventoryValue"
        );

    const lowStockCount =
        document.getElementById(
            "lowStockCount"
        );

    const outOfStockCount =
        document.getElementById(
            "outOfStockCount"
        );


    const total =
        calculateTotalInventoryValue(products);


    const lowStock =
        countLowStockProducts(products);


    const outOfStock =
        countOutOfStockProducts(products);


    totalInventoryValue.textContent =
        `₱${total.toLocaleString()}`;


    lowStockCount.textContent =
        lowStock;


    outOfStockCount.textContent =
        outOfStock;

}