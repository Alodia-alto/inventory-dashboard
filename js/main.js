import { products } from "./products.js";

import {
    searchProducts,
    filterProductsByCategory
} from "./inventoryUtils.js";

import {
    displayProducts,
    displaySummary
} from "./display.js";


// Get HTML elements

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const searchBtn =
    document.getElementById("searchBtn");

const resetBtn =
    document.getElementById("resetBtn");


// Display all products when page loads

displayProducts(products);
displaySummary(products);


// SEARCH BUTTON

searchBtn.addEventListener("click", function () {

    const query = searchInput.value.trim();

    const category = categoryFilter.value;


    // Search by product name

    let results = searchProducts(
        products,
        query
    );


    // Filter by category

    results = filterProductsByCategory(
        results,
        category
    );


    // Display results

    displayProducts(results);

});


// RESET BUTTON

resetBtn.addEventListener("click", function () {

    // Clear search

    searchInput.value = "";


    // Reset category

    categoryFilter.value = "All";


    // Show all products

    displayProducts(products);

});