import { products }
from "./products.js";


import {
    searchProducts,
    filterProductsByCategory
} from "./inventoryUtils.js";


import {
    displayProducts,
    displaySummary
} from "./display.js";


// ========================================
// SELECT HTML ELEMENTS
// ========================================

const searchInput =
    document.getElementById(
        "searchInput"
    );


const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


const searchBtn =
    document.getElementById(
        "searchBtn"
    );


const resetBtn =
    document.getElementById(
        "resetBtn"
    );


// ========================================
// UPDATE DASHBOARD
// ========================================

function updateDashboard() {

    let results = products;


    const query =
        searchInput.value.trim();


    const category =
        categoryFilter.value;


    // Search by product name

    if (query !== "") {

        results =
            searchProducts(
                results,
                query
            );

    }


    // Filter by category

    results =
        filterProductsByCategory(
            results,
            category
        );


    // Display filtered products

    displayProducts(results);


    // Summary always represents
    // the complete inventory

    displaySummary(products);

}


// ========================================
// SEARCH BUTTON
// ========================================

searchBtn.addEventListener(
    "click",
    updateDashboard
);


// ========================================
// CATEGORY FILTER
// ========================================

categoryFilter.addEventListener(
    "change",
    updateDashboard
);


// ========================================
// ENTER KEY SEARCH
// ========================================

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            updateDashboard();

        }

    }
);


// ========================================
// RESET BUTTON
// ========================================

resetBtn.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        categoryFilter.value = "All";


        displayProducts(products);

        displaySummary(products);

    }
);


// ========================================
// INITIAL DISPLAY
// ========================================

displayProducts(products);

displaySummary(products);