import { products } from "./products.js";

import {
    searchProducts,
    filterProductsByCategory
} from "./inventoryUtils.js";

import {
    displayProducts,
    displaySummary
} from "./display.js";


// =========================
// GET HTML ELEMENTS
// =========================

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


// =========================
// UPDATE DASHBOARD
// =========================

function updateDashboard() {

    // Search products

    const searchedProducts =
        searchProducts(
            products,
            searchInput.value
        );


    // Filter searched products

    const filteredProducts =
        filterProductsByCategory(
            searchedProducts,
            categoryFilter.value
        );


    // Display results

    displayProducts(
        filteredProducts
    );


    // Update summary

    displaySummary(
        filteredProducts
    );

}


// =========================
// SEARCH BUTTON
// =========================

searchBtn.addEventListener(
    "click",
    updateDashboard
);


// =========================
// CATEGORY FILTER
// =========================

categoryFilter.addEventListener(
    "change",
    updateDashboard
);


// =========================
// ENTER KEY SEARCH
// =========================

searchInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            updateDashboard();

        }

    }
);


// =========================
// RESET BUTTON
// =========================

resetBtn.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        categoryFilter.value =
            "All";


        displayProducts(
            products
        );


        displaySummary(
            products
        );

    }
);


// =========================
// INITIAL PAGE LOAD
// =========================

displayProducts(
    products
);


displaySummary(
    products
);