import {
    getStockStatus,
    calculateTotalInventoryValue,
    countLowStockProducts,
    countOutOfStockProducts
} from "./inventoryUtils.js";


// Format currency only for display

const formatCurrency = (value) => {

    return new Intl.NumberFormat(
        "en-PH",
        {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 2
        }
    ).format(value);

};


// Display product cards

export function displayProducts(products) {

    const productList =
        document.getElementById(
            "productList"
        );

    const noResultsMessage =
        document.getElementById(
            "noResultsMessage"
        );


    // Clear old cards

    productList.innerHTML = "";


    // Show no-results message

    if (products.length === 0) {

        noResultsMessage.style.display =
            "block";

        return;
    }


    noResultsMessage.style.display =
        "none";


    // Required forEach loop

    products.forEach((product) => {

        // Required object destructuring

        const {
            id,
            name,
            category,
            price,
            stock
        } = product;


        const status =
            getStockStatus(stock);


        const statusClass =
            status
                .toLowerCase()
                .replaceAll(
                    " ",
                    "-"
                );


        // Create product card

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "product-card";


        card.dataset.id = id;


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

                    <span class="info-value price">
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


// Display inventory summary

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


    totalInventoryValue.textContent =
        formatCurrency(
            calculateTotalInventoryValue(
                products
            )
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