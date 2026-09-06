// ==========================================
// PRODUCT INVENTORY DASHBOARD
// ITP10 - EVENT-DRIVEN PROGRAMMING
// ==========================================


// ==========================================
// 1. PRODUCT DATA
// ==========================================

const products = [
    {
        id: 1,
        name: "Wireless Mouse",
        category: "Accessories",
        price: 650,
        stock: 12
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 1800,
        stock: 5
    },
    {
        id: 3,
        name: "24-inch Monitor",
        category: "Displays",
        price: 7800,
        stock: 3
    },
    {
        id: 4,
        name: "1 TB SSD",
        category: "Storage",
        price: 4200,
        stock: 0
    },
    {
        id: 5,
        name: "Webcam",
        category: "Accessories",
        price: 1500,
        stock: 8
    },
    {
        id: 6,
        name: "16GB RAM",
        category: "Components",
        price: 2500,
        stock: 4
    }
];


// ==========================================
// 2. GET HTML ELEMENTS
// ==========================================

const productList = document.getElementById("productList");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");

const searchBtn = document.getElementById("searchBtn");

const resetBtn = document.getElementById("resetBtn");

const totalInventoryValue =
    document.getElementById("totalInventoryValue");

const lowStockCount =
    document.getElementById("lowStockCount");

const outOfStockCount =
    document.getElementById("outOfStockCount");

const noResultsMessage =
    document.getElementById("noResultsMessage");


// ==========================================
// 3. FORMAT PRICE
// ==========================================

function formatPrice(price) {
    return price.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP"
    });
}


// ==========================================
// 4. GET STOCK STATUS
// ==========================================

function getStockStatus(stock) {

    if (stock === 0) {
        return {
            text: "Out of Stock",
            className: "out-of-stock"
        };
    }

    if (stock <= 5) {
        return {
            text: "Low Stock",
            className: "low-stock"
        };
    }

    return {
        text: "In Stock",
        className: "in-stock"
    };
}


// ==========================================
// 5. DISPLAY PRODUCTS
// ==========================================

function displayProducts(productArray) {

    // Clear existing products
    productList.innerHTML = "";

    // Show "No products found"
    if (productArray.length === 0) {
        noResultsMessage.style.display = "block";
        return;
    }

    // Hide "No products found"
    noResultsMessage.style.display = "none";


    // Create product cards
    productArray.forEach(function(product) {

        const status = getStockStatus(product.stock);

        const productCard = document.createElement("article");

        productCard.className = "product-card";


        productCard.innerHTML = `
            <div class="product-card-header">
                <h3>${product.name}</h3>
            </div>

            <div class="product-info">

                <p>
                    <strong>ID:</strong>
                    ${product.id}
                </p>

                <p>
                    <strong>Category:</strong>
                    <span class="category">
                        ${product.category}
                    </span>
                </p>

                <p>
                    <strong>Price:</strong>
                    ${formatPrice(product.price)}
                </p>

                <p>
                    <strong>Stock:</strong>
                    ${product.stock}
                </p>

            </div>

            <span class="stock-status ${status.className}">
                ${status.text}
            </span>
        `;


        productList.appendChild(productCard);
    });
}


// ==========================================
// 6. UPDATE INVENTORY SUMMARY
// ==========================================

function updateSummary(productArray) {

    // Calculate total inventory value
    const totalValue = productArray.reduce(
        function(total, product) {
            return total + (product.price * product.stock);
        },
        0
    );


    // Count low-stock products
    const lowStock = productArray.filter(
        function(product) {
            return product.stock > 0 && product.stock <= 5;
        }
    ).length;


    // Count out-of-stock products
    const outOfStock = productArray.filter(
        function(product) {
            return product.stock === 0;
        }
    ).length;


    // Update HTML
    totalInventoryValue.textContent = formatPrice(totalValue);

    lowStockCount.textContent = lowStock;

    outOfStockCount.textContent = outOfStock;
}


// ==========================================
// 7. FILTER PRODUCTS
// ==========================================

function filterProducts() {

    const searchText =
        searchInput.value.trim().toLowerCase();

    const selectedCategory =
        categoryFilter.value;


    const filteredProducts = products.filter(
        function(product) {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;


            return matchesSearch && matchesCategory;
        }
    );


    // Display filtered products
    displayProducts(filteredProducts);


    // Update summary based on filtered products
    updateSummary(filteredProducts);
}


// ==========================================
// 8. RESET DASHBOARD
// ==========================================

function resetDashboard() {

    // Clear search
    searchInput.value = "";

    // Reset category
    categoryFilter.value = "All";

    // Display all products
    displayProducts(products);

    // Restore original summary
    updateSummary(products);
}


// ==========================================
// 9. EVENT LISTENERS
// ==========================================


// Search button
searchBtn.addEventListener("click", function() {
    filterProducts();
});


// Search while typing
searchInput.addEventListener("input", function() {
    filterProducts();
});


// Category filter
categoryFilter.addEventListener("change", function() {
    filterProducts();
});


// Reset button
resetBtn.addEventListener("click", function() {
    resetDashboard();
});


// ==========================================
// 10. INITIALIZE DASHBOARD
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    displayProducts(products);

    updateSummary(products);

});