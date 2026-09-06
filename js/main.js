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


// Display products when page loads
displayProducts(products);
displaySummary(products);


// SEARCH BUTTON
searchBtn.addEventListener("click", function () {

    const query = searchInput.value.trim();

    const category = categoryFilter.value;

    // First search by name
    let results = searchProducts(products, query);

    // Then filter by category
    results = filterProductsByCategory(results, category);

    // Display results
    displayProducts(results);
});


// RESET BUTTON
resetBtn.addEventListener("click", function () {

    // Clear search box
    searchInput.value = "";

    // Set category back to All
    categoryFilter.value = "All";

    // Display all products
    displayProducts(products);
});