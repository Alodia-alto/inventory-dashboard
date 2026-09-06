import {
    getStockStatus,
    calculateTotalInventoryValue,
    countLowStockProducts,
    countOutOfStockProducts
} from "./inventoryUtils.js";


// ========================================
// FORMAT CURRENCY
// ========================================

function formatCurrency(value) {

    return "₱" +
        Number(value).toLocaleString("en-PH");

}


// ========================================
// DISPLAY PRODUCTS
// ========================================

export function displayProducts(products) {

    const productList =
        document.getElementById(
            "productList"
        );

    const noResultsMessage =
        document.getElementById(
            "noResultsMessage"
        );


    // Clear existing products

    productList.innerHTML = "";


    // Show no-results message

    if (products.length === 0) {

        noResultsMessage.style.display =
            "block";

        return;
    }


    noResultsMessage.style.display =
        "none";


    // Display every product

    products.forEach(function (product) {

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


        card.dataset.id = id;


        // Determine CSS class

        let statusClass =
            "in-stock";


        if (status === "Low Stock") {

            statusClass =
                "low-stock";

        }
        else if (
            status === "Out of Stock"
        ) {

            statusClass =
                "out-of-stock";

        }


        // Create product card

        card.innerHTML = `

            <div class="card-top">

                <div>

                    <h3>${name}</h3>

                    <p class="category">
                        ${category}
                    </p>

                </div>


                <span
                    class="status ${statusClass}"
                >
                    ${status}
                </span>

            </div>


            <div class="product-info">

                <div class="info-row">

                    <span class="info-label">
                        Price
                    </span>

                    <span
                        class="info-value price"
                    >
                        ${formatCurrency(price)}
                    </span>

                </div>


                <div class="info-row">

                    <span class="info-label">
                        Stock Quantity
                    </span>

                    <span class="info-value">
                        ${stock}
                    </span>

                </div>


                <div class="info-row">

                    <span class="info-label">
                        Product ID
                    </span>

                    <span class="info-value">
                        #${id}
                    </span>

                </div>

            </div>

        `;


        productList.appendChild(card);

    });

}


// ========================================
// DISPLAY TOTAL INVENTORY VALUE
// ========================================

export function displayTotalInventoryValue(
    products
) {

    const totalInventoryValue =
        document.getElementById(
            "totalInventoryValue"
        );


    const total =
        calculateTotalInventoryValue(
            products
        );


    totalInventoryValue.textContent =
        formatCurrency(total);

}


// ========================================
// DISPLAY STOCK COUNTS
// ========================================

export function displayStockCounts(
    products
) {

    const lowStockCount =
        document.getElementById(
            "lowStockCount"
        );


    const outOfStockCount =
        document.getElementById(
            "outOfStockCount"
        );


    lowStockCount.textContent =
        countLowStockProducts(
            products
        );


    outOfStockCount.textContent =
        countOutOfStockProducts(
            products
        );

}


// ========================================
// DISPLAY SUMMARY
// ========================================

export function displaySummary(
    products
) {

    displayTotalInventoryValue(
        products
    );


    displayStockCounts(
        products
    );

}