// defines products
const products = Array.from({ length: 183 }, (_, index) => ({
    name: `Product ${index + 1}`,
    price: `$${(Math.random() * (200 - 10) + 10).toFixed(2)}`,
    sellingvalue: Math.floor(Math.random() * 100) + 1,
    limited: Math.random() < 0.05,
    image: "https://via.placeholder.com/150",
    link: "#",
    specialty: false,
}));

// works with shop page
function loadShop() {
    let content = document.getElementById("mainshop");
    content.innerHTML = "";

    const itemsPerPage = 24;
    let currentPage = 1;

    function renderPage(page) {
        content.innerHTML = "";

        const start = (page - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, products.length);

        for (let i = start; i < end; i++) {
            const product = products[i];
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
            productNameLink.style.color = product.limited ? "#4286a8" : "white";
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

        numbers();
    }

    function numbers() {
        let paginationDiv = document.getElementById("pagination");
        if (!paginationDiv) {
            paginationDiv = document.createElement("div");
            paginationDiv.id = "pagination";
            paginationDiv.style.textAlign = "center";
            paginationDiv.style.marginTop = "20px";
			paginationDiv.style.display = "flex";
            content.appendChild(paginationDiv);
        } else {
            paginationDiv.innerHTML = "";
        }

        const totalPages = Math.ceil(products.length / itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.style.margin = "0 5px";
            pageButton.style.padding = "10px 20px";
            pageButton.style.cursor = "pointer";
            pageButton.style.backgroundColor = i === currentPage ? "#a6a6a6" : "white";
            pageButton.style.color = "black";
            pageButton.style.fontSize = "10pt";
            pageButton.style.fontWeight = "bold";

            // event listeners
            pageButton.addEventListener("click", () => {
                currentPage = i;
                renderPage(i);
				window.scrollTo({
					top: document.getElementById("shopcenter").offsetTop - 150,
					
				});
            });
            pageButton.addEventListener("mouseover", () => {
                pageButton.style.backgroundColor = "#a6a6a6";
            });
            pageButton.addEventListener("mouseout", () => {
                if (i !== currentPage) pageButton.style.backgroundColor = "white";
            });

            paginationDiv.appendChild(pageButton);
        }
    }

    renderPage(currentPage);

    function getTotal() {
        let output = document.getElementById("counted");
        output.innerHTML = products.length + " items";
    }

    getTotal();
}

function sortStuff() {  
	const select = document.getElementById("selection");  
	const selectedOption = select.value;  

	const sortedProducts = [...products].map(product => ({  
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
		case "Top Sellers":  
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
        productNameLink.style.color = product.limited ? "#4286a8" : "white";
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

    // Pagination numbers
    function numbers() {
        let paginationDiv = document.getElementById("pagination");
        if (!paginationDiv) {
            paginationDiv = document.createElement("div");
            paginationDiv.id = "pagination";
            paginationDiv.style.textAlign = "center";
			paginationDiv.style.display = "flex";
            paginationDiv.style.marginTop = "20px";
        } else {
            paginationDiv.innerHTML = "";
        }

        const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.style.margin = "0 5px";
            pageButton.style.padding = "10px 20px";
            pageButton.style.cursor = "pointer";
            pageButton.style.backgroundColor = i === currentPage ? "#a6a6a6" : "white";
            pageButton.style.color = "black";
            pageButton.style.fontSize = "10pt";
            pageButton.style.fontWeight = "bold";
            pageButton.addEventListener("click", () => {
                renderSortedPage(sortedProducts, i);
				window.scrollTo({
					top: document.getElementById("shopcenter").offsetTop - 150,
					
				});
            });
            pageButton.addEventListener("mouseover", () => {
                pageButton.style.backgroundColor = "#a6a6a6";
            });
            pageButton.addEventListener("mouseout", () => {
                if (i !== currentPage) pageButton.style.backgroundColor = "white";
            });
            paginationDiv.appendChild(pageButton);
        }

        content.appendChild(paginationDiv);
    }

    numbers();
}
