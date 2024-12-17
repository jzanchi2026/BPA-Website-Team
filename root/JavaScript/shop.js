const departments = ["men", "women", "unisex", "youth"];
const collections = ["featured", "media", "apparel", "albums"];
// defines products
const products = Array.from({ length: 183 }, (_, index) => ({
    name: `Product ${index + 1}`,
    price: `$${(Math.random() * (200 - 10) + 10).toFixed(2)}`,
    sellingvalue: Math.floor(Math.random() * 100) + 1,
    limited: Math.random() < 0.15,
    image: "https://via.placeholder.com/150",
    link: "#",
    specialty: false,
	filters: {
        departments: departments[Math.floor(Math.random() * departments.length)],
        collections: collections[Math.floor(Math.random() * collections.length)],
    },
}));

function getSelectedFilters() {
    let selected = {
        collections: [],
        priceRanges: [],
        department: []
    };

    let container = document.getElementById("categories");

    let collections = container.querySelectorAll('input[name="collection[]"]:checked');
    collections.forEach(checkbox => selected.collections.push(checkbox.value));

    let priceRanges = container.querySelectorAll('input[name="price_range[]"]:checked');
    priceRanges.forEach(checkbox => selected.priceRanges.push(checkbox.value));

    let departments = container.querySelectorAll('input[name="department[]"]:checked');
    departments.forEach(checkbox => selected.department.push(checkbox.value));

    console.log(selected);
	return selected;
}

let filteredProducts = []; 

function loadShop() {
    let content = document.getElementById("mainshop");
    let filters = getSelectedFilters();
    let count = 0;
	document.getElementById("selection").selectedIndex = 0;
    content.innerHTML = "";

    const itemsPerPage = 24;
    let currentPage = 1;

    function matchesPriceRange(price, priceRanges) {
        const numericPrice = parseFloat(price.replace("$", ""));
        return priceRanges.some(range => {
            const [min, max] = range.split("-").map(Number);
			console.log(min + " - " + max);
            return numericPrice >= min && numericPrice <= max;
        });
    }

    function filterProducts() {
        return products.filter(product => {
            if (filters == null) return true;
            const { collections, department, priceRanges } = filters;

            const matchesCollection =
                collections.length === 0 ||
                collections.map(c => c.toLowerCase()).includes(product.filters.collections.toLowerCase());

            const matchesDepartment =
                department.length === 0 ||
                department.map(d => d.toLowerCase()).includes(product.filters.departments.toLowerCase());

            const matchesPrice =
                priceRanges.length === 0 || matchesPriceRange(product.price, priceRanges);

            return matchesCollection && matchesDepartment && matchesPrice;
        });
    }

    function renderPage(filteredProducts, page) {
        content.innerHTML = "";
        const start = (page - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, filteredProducts.length);

        for (let i = start; i < end; i++) {
            const product = filteredProducts[i];
            let productCard = document.createElement("div");
            productCard.style.textAlign = "left";
            productCard.style.width = "200px";
            productCard.style.display = "inline-block";
            productCard.style.verticalAlign = "top";
            productCard.style.transition = "transform 0.3s";
            productCard.addEventListener("mouseover", () => {
                productCard.style.transform = "scale(1.02)";
            });
            productCard.addEventListener("mouseout", () => {
                productCard.style.transform = "scale(1.0)";
            });

            // Product Image
            let productImageLink = document.createElement("a");
            productImageLink.href = product.link;
            let productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.style.width = "200px";
            productImage.style.height = "200px";
            productImage.style.display = "block";
            productImageLink.appendChild(productImage);
            productCard.appendChild(productImageLink);

            // Product Name
            let productNameLink = document.createElement("a");
            productNameLink.href = product.link;
            productNameLink.textContent = product.name.toUpperCase();
            productNameLink.style.display = "block";
            productNameLink.style.margin = "10px 0 5px";
            productNameLink.style.color = product.limited ? "#4f9e91" : "white";
            productNameLink.style.fontFamily = "radlushmed";
            productNameLink.style.textDecoration = "none";
            productNameLink.style.fontWeight = "bold";
            productNameLink.style.fontSize = "15pt";
            productNameLink.addEventListener("mouseover", () => {
                productNameLink.style.textDecoration = "underline";
            });
            productNameLink.addEventListener("mouseout", () => {
                productNameLink.style.textDecoration = "none";
            });
            productCard.appendChild(productNameLink);

            // Product Price
            let productPrice = document.createElement("p");
            productPrice.textContent = product.price;
            productPrice.style.color = "white";
            productPrice.style.fontWeight = "bold";
            productPrice.style.margin = "0";
            productCard.appendChild(productPrice);

            content.appendChild(productCard);
        }

        renderPagination(filteredProducts);
    }

    function renderPagination(filteredProducts) {
        let paginationDiv = document.getElementById("pagination");
        if (!paginationDiv) {
            paginationDiv = document.createElement("div");
            paginationDiv.id = "pagination";
            paginationDiv.style.textAlign = "center";
            paginationDiv.style.marginTop = "20px";
            paginationDiv.style.display = "flex";
            paginationDiv.style.justifyContent = "center";
			paginationDiv.style.backgroundColor = "red";
            content.appendChild(paginationDiv);
        } else {
            paginationDiv.innerHTML = "";
        }

        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
			if (i != 1)
				pageButton.style.margin = "0 1px";
            pageButton.style.padding = "10px 20px";
			pageButton.style.height = "100%";
			pageButton.style.width = "auto";
            pageButton.style.cursor = "pointer";
            pageButton.style.backgroundColor = i === currentPage ? "#365953" : "black";
            pageButton.style.color = "white";
            pageButton.style.fontSize = "10pt";
            pageButton.style.fontWeight = "bold";
			pageButton.style.borderRadius = "0";
			
            pageButton.addEventListener("click", () => {
                currentPage = i;
                renderPage(filteredProducts, i);
                window.scrollTo({
                    top: document.getElementById("shopcenter").offsetTop - 150,
                    behavior: "smooth",
                });
            });

            paginationDiv.appendChild(pageButton);
        }
    }

    // Update item count
    function updateItemCount(totalFilteredItems) {
        let output = document.getElementById("counted");
        output.innerHTML = `${totalFilteredItems} items`;
    }

    // Main logic
    filteredProducts = filterProducts(); // Update global filteredProducts
    count = filteredProducts.length;
    updateItemCount(count);
    renderPage(filteredProducts, currentPage);
}

// Sort function now works with filteredProducts
function sortStuff() {
    const select = document.getElementById("selection");
    const selectedOption = select.value;

    const sortedProducts = [...filteredProducts].map(product => ({
        ...product,
        price: parseFloat(product.price.replace("$", "")),
        sellingvalue: parseInt(product.sellingvalue, 10),
    }));

    switch (selectedOption) {
        case "lowtohigh":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case "hightolow":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case "limited":
            sortedProducts.sort((a, b) => {
                if (a.limited && !b.limited) return -1;
                if (!a.limited && b.limited) return 1;
                return 0;
            });
            break;
        case "topsellers":
            sortedProducts.sort((a, b) => b.sellingvalue - a.sellingvalue);
            break;
        default:
            return;
    }

    renderSortedPage(sortedProducts);
}

function renderSortedPage(sortedProducts, currentPage = 1) {
    const content = document.getElementById("mainshop");
    content.innerHTML = "";

    const itemsPerPage = 24;
    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, sortedProducts.length);

    for (let i = start; i < end; i++) {
        const product = sortedProducts[i];

        let productCard = document.createElement("div");
        productCard.style.textAlign = "left";
        productCard.style.width = "200px";
        productCard.style.display = "inline-block";
        productCard.style.verticalAlign = "top";
        productCard.style.transition = "transform 0.3s";
        productCard.addEventListener("mouseover", () => {
            productCard.style.transform = "scale(1.02)";
        });
        productCard.addEventListener("mouseout", () => {
            productCard.style.transform = "scale(1.0)";
        });

        // Product image
        let productImageLink = document.createElement("a");
        productImageLink.href = product.link;
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.style.width = "200px";
        productImage.style.height = "200px";
        productImage.style.display = "block";
        productImageLink.appendChild(productImage);
        productCard.appendChild(productImageLink);

        // Product name
        let productNameLink = document.createElement("a");
        productNameLink.href = product.link;
        productNameLink.textContent = product.name.toUpperCase();
        productNameLink.style.display = "block";
        productNameLink.style.margin = "10px 0 5px";
        productNameLink.style.color = product.limited ? "#4f9e91" : "white";
        productNameLink.style.fontFamily = "radlushmed";
        productNameLink.style.textDecoration = "none";
        productNameLink.style.fontWeight = "bold";
        productNameLink.style.fontSize = "15pt";
        productNameLink.addEventListener("mouseover", () => {
            productNameLink.style.textDecoration = "underline";
        });
        productNameLink.addEventListener("mouseout", () => {
            productNameLink.style.textDecoration = "none";
        });
        productCard.appendChild(productNameLink);

        // Product price
        let productPrice = document.createElement("p");
        productPrice.textContent = product.price ? `$${product.price.toFixed(2)}` : "$0.00";
        productPrice.style.color = "white";
        productPrice.style.fontWeight = "bold";
        productPrice.style.margin = "0";
        productCard.appendChild(productPrice);

        content.appendChild(productCard);
    }

}

function startTop() {
	window.scrollTo({
		top: document.getElementById("shopcenter").offsetTop - 150,
		behavior: 'smooth'
	});
}
