let cart = null;

const departments = ["men", "women", "unisex", "youth"];
const collections = ["accessories", "media", "apparel", "albums"];

// made up products
const products = Array.from({ length: 183 }, (_, index) => ({
    name: `Product ${index + 1}`,
	creator: "lol",
    price: `$${(Math.random() * (200 - 10) + 10).toFixed(2)}`,
	saleprice: Math.random() < 0.7 ? null : `$${(Math.random() * (50 - 10) + 10).toFixed(2)}`,
	details: "Fabric & Materials:<br>- 100% Cotton<br>- Soft, breathable fabric<br>- Pre-shrunk to maintain shape and fit<br>- Screen printed design for a high-quality finish<br><br>Design Features:<br>- Classic black color<br>- Crew neck design<br>- Short sleeves for a relaxed fit<br>- High-quality band graphic print<br>- Reinforced stitching for durability<br><br>Wash Instructions:<br>- Machine wash cold<br>- Wash with like colors<br>- Do not tumble dry<br>- Inside out for best print care<br>- Do not bleach<br>- Do not dry clean<br>- Do not iron over the graphic<br><br>NOTE: Size charts are for general reference. The fit may vary depending on construction, materials, and manufacturer. Sizing may also vary between and within brands.",
	sellingvalue: Math.floor(Math.random() * 100) + 1,
    limited: Math.random() < 0.15,
    image: "../Images/lightts.avif",
	filters: {
        departments: departments[Math.floor(Math.random() * departments.length)],
        collections: collections[Math.floor(Math.random() * collections.length)],
    },
}));

products[0] = {
    name: "Classic Black Tee",
	creator: "John Doe from Fresh Styles",
    price: "$25.00",
	saleprice: "$10.00",
	details: "Fabric & Materials:<br>- 100% Cotton<br>- Soft, breathable fabric<br>- Pre-shrunk to maintain shape and fit<br>- Screen printed design for a high-quality finish<br><br>Design Features:<br>- Classic black color<br>- Crew neck design<br>- Short sleeves for a relaxed fit<br>- High-quality band graphic print<br>- Reinforced stitching for durability<br><br>Wash Instructions:<br>- Machine wash cold<br>- Wash with like colors<br>- Do not tumble dry<br>- Inside out for best print care<br>- Do not bleach<br>- Do not dry clean<br>- Do not iron over the graphic<br><br>NOTE: Size charts are for general reference. The fit may vary depending on construction, materials, and manufacturer. Sizing may also vary between and within brands.",
	sellingvalue: 100,
    limited: false,
    image: "../Images/testshirt.jpeg",
    filters: {
        departments: "unisex",
        collections: "apparel",
    },
};

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

	return selected;
}

function passChoice(choice) {
    const collectionCheckboxes = document.querySelectorAll('input[name="collection[]"]');
    collectionCheckboxes.forEach(checkbox => (checkbox.checked = false));
    
    collectionCheckboxes.forEach(checkbox => {
        if (checkbox.value.toUpperCase() === choice.toUpperCase()) {
            checkbox.checked = true;
        }
    });

    loadShop();
	window.scrollTo({
		top: document.getElementById("mainshop").offsetTop - 150,
		behavior: "smooth"
	});
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
        const priceToCheck = price ? parseFloat(price.replace("$", "")) : parseFloat(price.replace("$", ""));
        return priceRanges.some(range => {
            const [min, max] = range.split("-").map(Number);
            return priceToCheck >= min && priceToCheck <= max;
        });
    }

    function filterProducts() {
        return products.filter(product => {
            if (filters == null) return true;

            const { collections, department, priceRanges } = filters;

            const isClearanceSelected = collections.includes("CLEARANCE");

            const matchesCollection = collections.length === 0 || collections.some(c => {
                if (c.toLowerCase() === "clearance") {
                    return product.saleprice !== null;
                }
                return product.filters.collections.toLowerCase().includes(c.toLowerCase());
            });

            const matchesDepartment = department.length === 0 || department.some(d => 
                d.toLowerCase() === product.filters.departments.toLowerCase()
            );

            const matchesPrice = priceRanges.length === 0 || matchesPriceRange(product.saleprice || product.price, priceRanges);

            if (isClearanceSelected) {
                if (collections.length > 1) {
                    const matchesClearanceAndCollection = collections.some(c => 
                        c.toLowerCase() !== "clearance" &&
                        product.filters.collections.toLowerCase().includes(c.toLowerCase())
                    );

                    const isValidClearanceProduct = product.saleprice !== null && matchesClearanceAndCollection;

                    return isValidClearanceProduct && matchesDepartment && matchesPrice;
                }

                if (collections.length === 1) {
                    return product.saleprice !== null && matchesDepartment && matchesPrice;
                }
            }
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
            productCard.classList.add("product-card");
			productCard.addEventListener("click", () => {
				popUp(product);
			});

            // Product Image
            let productImage = document.createElement("img");
            productImage.src = product.image;
            productCard.appendChild(productImage);

            // Product Name
            let productNameLink = document.createElement("a");
            productNameLink.textContent = product.name.toUpperCase();
            productNameLink.classList.add("product-name");
            if (product.limited) productNameLink.classList.add("limited");
            productNameLink.addEventListener("mouseover", () => {
                productNameLink.classList.add("hover");
            });
            productNameLink.addEventListener("mouseout", () => {
                productNameLink.classList.remove("hover");
            });
            productCard.appendChild(productNameLink);

            // Product Price
            let productPrice = document.createElement("p");
            productPrice.classList.add("product-price");
            if (product.saleprice != null) {
                productPrice.innerHTML = `<s>${product.price}</s> <span>${product.saleprice}</span>`;
            } else {
                productPrice.textContent = product.price;
            }
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
            content.appendChild(paginationDiv);
        } else {
            paginationDiv.innerHTML = "";
        }

        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            if (i === currentPage) pageButton.classList.add("active");
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

    function updateItemCount(totalFilteredItems) {
        let output = document.getElementById("counted");
        output.innerHTML = `${totalFilteredItems} ITEMS`;
    }

    // Main logic
    filteredProducts = filterProducts(); 
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
        newprice: product.saleprice 
            ? parseFloat(product.saleprice.replace("$", "")) 
            : parseFloat(product.price.replace("$", "")),
        sellingvalue: parseInt(product.sellingvalue, 10),
    }));

    switch (selectedOption) {
        case "lowtohigh":
            sortedProducts.sort((a, b) => a.newprice - b.newprice);
            break;
        case "hightolow":
            sortedProducts.sort((a, b) => b.newprice - a.newprice);
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

        // Create product card
        let productCard = document.createElement("div");
        productCard.classList.add("product-card");
		productCard.addEventListener("click", () => {
            popUp(product);
        });

        // Product Image
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productCard.appendChild(productImage);

        // Product Name
        let productNameLink = document.createElement("a");
        productNameLink.textContent = product.name.toUpperCase();
        productNameLink.classList.add("product-name");
        if (product.limited) productNameLink.classList.add("limited");
        productCard.appendChild(productNameLink);

        // Product Price
        let productPrice = document.createElement("p");
        if (product.saleprice) {
            productPrice.innerHTML = `<s>${product.price}</s> <span>${product.saleprice}</span>`;
            productPrice.classList.add("product-price", "sale");
        } else {
            productPrice.textContent = product.price;
            productPrice.classList.add("product-price");
        }
        productCard.appendChild(productPrice);

        // Append product card to content
        content.appendChild(productCard);
    }
}


function startTop() {
	window.scrollTo({
		top: document.getElementById("shopcenter").offsetTop - 150,
		behavior: 'smooth'
	});
}

function popUp(item) {
	document.getElementsByTagName("body")[0].style.overflow = "hidden";
	
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100vw';
    popup.style.height = '100vh';
    popup.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '9999';
    
    // Create popup content box
    const popupContent = document.createElement('div');
    popupContent.style.backgroundImage = "url('../Images/ghostbg.png')";
	popupContent.style.backgroundSize = "24.5%";
    popupContent.style.padding = '20px 100px';
    popupContent.style.borderRadius = '5px';
    popupContent.style.width = '100vw';
	popupContent.style.height = '95vh';
    popupContent.style.textAlign = 'center';
	popupContent.style.overflowY = 'auto';
	
	// Configures the content's layout
	const flexed = document.createElement('div');
	flexed.style.display = 'flex';
	const sideone = document.createElement('div');
	sideone.style.width = '45%';
	const sidetwo = document.createElement('div');
	sidetwo.style.width = '55%';
	sidetwo.style.textAlign = 'left';
	flexed.appendChild(sideone);
	flexed.appendChild(sidetwo);
	
	// Tags
	function createTag(text, sidetwo) {
		const tag = document.createElement('p');
		tag.textContent = text.toUpperCase();
		tag.style.backgroundColor = '#7a7a7a';
		tag.style.padding = '7px';
		tag.style.fontFamily = 'salmapro';
		tag.style.display = 'inline-block';
		tag.style.borderRadius = '3px';
		tag.style.fontSize = '13px';
		tag.style.color = 'white';
		tag.style.margin = sidetwo.children.length === 0 ? '0px 5px 0px 0px' : '0px 5px';
		tag.style.marginBottom = '25px';
		return tag;
	}

	// Limited edition
	if (item.limited) {
		const limited = createTag('LIMITED EDITION', sidetwo);
		sidetwo.appendChild(limited);
	}
	
	// Best seller 
	if (item.sellingvalue >= 50) {
		const limited = createTag('BEST SELLER', sidetwo);
		sidetwo.appendChild(limited);
	}

	// Department
	if (item.filters.departments != null) {
		const depart = createTag(item.filters.departments, sidetwo);
		sidetwo.appendChild(depart);
	}

	// Collection
	if (item.filters.collections != null) {
		const collect = createTag(item.filters.collections, sidetwo);
		sidetwo.appendChild(collect);
	}
    
    // Title
    const title = document.createElement('h2');
    title.textContent = item.name;
	title.style.fontFamily = 'pasti';
	title.style.letterSpacing = '1.5px';
    title.style.fontSize = '60pt';
	sidetwo.appendChild(title);
	
	// Creator
    const creator = document.createElement('p');
    creator.textContent = item.creator;
	creator.style.fontFamily = 'salmapro';
    creator.style.fontSize = '18px';
	creator.style.opacity = '0.5';
	creator.style.letterSpacing = '1px';
    creator.style.marginBottom = '20px';
	sidetwo.appendChild(creator);
	
    // Price
	if (item.saleprice !== undefined && item.saleprice !== null) {

		const ogprice = document.createElement('span');
		ogprice.textContent = item.price;
		ogprice.style.textDecoration = "line-through";
		ogprice.style.marginRight = "10px";
		ogprice.style.fontFamily = 'salmapro';
		
		const newprice = document.createElement('span');
		newprice.textContent = item.saleprice; 
		newprice.style.fontWeight = 'bold';
		newprice.style.fontFamily = 'salmapro';
		newprice.style.color = '#4286a8';
		newprice.style.marginLeft = '5px';
		
		const price = document.createElement('p');
		price.appendChild(ogprice);
		price.appendChild(newprice);
		price.style.fontSize = '25px';
		price.style.fontFamily = 'salmapro';
		price.style.marginBottom = '20px';
		
		sidetwo.appendChild(price);
	} else {
		const price = document.createElement('p');
		price.textContent = item.price;
		price.style.fontSize = '25px';
		price.style.fontWeight = 'bold';
		price.style.fontFamily = 'salmapro';
		price.style.marginBottom = '20px';
		sidetwo.appendChild(price);
	}
	
	// Size selection
	let selectedSize = "";
	const sizeContainer = document.createElement('div');
	sizeContainer.style.display = 'flex';
	sizeContainer.style.gap = '10px';
	sizeContainer.style.marginBottom = '15px';

	const sizes = ['XS', 'S', 'M', 'L', 'XL'];

	sizes.forEach(size => {
		const sizeButton = document.createElement('button');
		sizeButton.textContent = size;
		sizeButton.style.fontFamily = 'salmapro';
		sizeButton.style.fontSize = '16px';
		sizeButton.style.padding = '8px 12px';
		sizeButton.style.border = '1px solid #9e9e9e';
		sizeButton.style.borderRadius = '3px';
		sizeButton.style.backgroundColor = 'white';
		sizeButton.style.color = '#333';
		sizeButton.style.cursor = 'pointer';
		sizeButton.style.transition = 'background-color 0.3s, color 0.3s';

		sizeButton.addEventListener('click', () => {
			Array.from(sizeContainer.children).forEach(btn => {
				btn.style.backgroundColor = 'white';
				btn.style.color = '#333';
			});

			sizeButton.style.backgroundColor = '#333';
			sizeButton.style.border = '1px solid black';
			sizeButton.style.color = '#b8ced9';
			selectedSize = sizeButton.textContent;
			console.log(selectedSize);
		});

		sizeContainer.appendChild(sizeButton);
	});

	sidetwo.appendChild(sizeContainer);

	// Size chart
	const sizeChartContainer = document.createElement('div');
	sizeChartContainer.style.marginBottom = '35px';

	const toggleButton = document.createElement('button');
	toggleButton.innerHTML = "Size Chart <span style='float: right; font-weight: bold;'>+</span>";
	toggleButton.style.fontFamily = 'pasti';
	toggleButton.style.fontSize = '16px';
	toggleButton.style.padding = '8px 12px 6px';
	toggleButton.style.borderRadius = '5px';
	toggleButton.style.backgroundColor = '#4286a8';
	toggleButton.style.color = 'white';
	toggleButton.style.textAlign = 'left';
	toggleButton.style.width = '20%';
	toggleButton.style.cursor = 'pointer';
	toggleButton.style.marginBottom = '0px';
	toggleButton.style.transition = 'background-color 0.3s, color 0.3s';

	const sizeChartWrapper = document.createElement('div');
	sizeChartWrapper.style.overflow = 'hidden';
	sizeChartWrapper.style.maxHeight = '0';
	sizeChartWrapper.style.transition = 'max-height 0.3s ease-in-out';

	const sizeChart = document.createElement('table');
	sizeChart.style.width = '100%';
	sizeChart.style.borderCollapse = 'collapse';

	const chartData = [
		['Size', 'Chest (in)', 'Waist (in)', 'Hips (in)'],
		['XS', '32-34', '24-26', '34-36'],
		['S', '35-37', '27-29', '37-39'],
		['M', '38-40', '30-32', '40-42'],
		['L', '41-43', '33-35', '43-45'],
		['XL', '44-46', '36-38', '46-48']
	];

	chartData.forEach((row, rowIndex) => {
		const tr = document.createElement('tr');
		row.forEach((cell) => {
			const td = document.createElement(rowIndex === 0 ? 'th' : 'td');
			td.textContent = cell;
			td.style.border = rowIndex === 0 ? '3.5px solid #4286a8' : '3.5px solid #2b2b2b';
			td.style.padding = '8px';
			td.style.textAlign = 'center';
			td.style.backgroundColor = rowIndex === 0 ? '#7dbcdb' : 'black';
			td.style.fontFamily = 'salmapro';
			tr.appendChild(td);
		});
		sizeChart.appendChild(tr);
	});

	sizeChartWrapper.appendChild(sizeChart);

	const updateToggleButtonBorderRadius = () => {
		toggleButton.style.borderRadius = '5px';
	};

	toggleButton.addEventListener('click', () => {
		const isVisible = sizeChartWrapper.style.maxHeight !== '0px';
		sizeChartWrapper.style.maxHeight = isVisible ? '0px' : '300px';

		toggleButton.innerHTML = isVisible
			? "Size Chart <span style='float: right; font-weight: bold;'>+</span>"
			: "Size Chart <span style='float: right; font-weight: bold;'>-</span>";

		if (!isVisible) {
			toggleButton.style.borderRadius = '5px 5px 0px 0px';
		}

		if (isVisible) {
			sizeChartWrapper.addEventListener('transitionend', updateToggleButtonBorderRadius, { once: true });
		}
	});
	sizeChartContainer.appendChild(toggleButton);
	sizeChartContainer.appendChild(sizeChartWrapper);
	sidetwo.appendChild(sizeChartContainer);
	
	// Quantity
	const quantlbl = document.createElement('p');
	quantlbl.textContent = 'Quantity:';
	quantlbl.style.fontFamily = 'salmapro';
	quantlbl.style.fontSize = '16px';
	
	quantlbl.style.marginBottom = '10px';
	quantlbl.style.display = 'block'; 
	
	const quantityContainer = document.createElement('div');
	quantityContainer.style.display = 'flex';
	quantityContainer.style.alignItems = 'center';
	quantityContainer.style.marginBottom = '25px';

	const decrementButton = document.createElement('button');
	decrementButton.textContent = '-';
	decrementButton.style.fontFamily = 'salmapro';
	decrementButton.style.fontSize = '16px';
	decrementButton.style.width = '5%';
	decrementButton.style.padding = '8px 12px';
	decrementButton.style.borderRadius = '0px';
	decrementButton.style.backgroundColor = '#c7c7c7';
	decrementButton.style.color = '#333';
	decrementButton.style.cursor = 'pointer';
	decrementButton.style.transition = 'background-color 0.3s, color 0.3s';

	const quantityDisplay = document.createElement('div');
	quantityDisplay.textContent = '1';
	quantityDisplay.style.fontFamily = 'salmapro';
	quantityDisplay.style.fontSize = '16px';
	quantityDisplay.style.padding = '8px 0px';
	quantityDisplay.style.backgroundColor = '#e0e0e0';
	quantityDisplay.style.color = '#333';
	quantityDisplay.style.textAlign = 'center';
	quantityDisplay.style.minWidth = '50px';

	const incrementButton = document.createElement('button');
	incrementButton.textContent = '+';
	incrementButton.style.fontFamily = 'salmapro';
	incrementButton.style.fontSize = '16px';
	incrementButton.style.width = '5%';
	incrementButton.style.padding = '8px 12px';
	incrementButton.style.borderRadius = '0px';
	incrementButton.style.backgroundColor = '#c7c7c7';
	incrementButton.style.color = '#333';
	incrementButton.style.cursor = 'pointer';
	incrementButton.style.transition = 'background-color 0.3s, color 0.3s';

	[decrementButton, incrementButton].forEach(button => {
		button.addEventListener('mouseover', () => {
			button.style.backgroundColor = '#9e9e9e';
			button.style.color = 'white';
		});
		button.addEventListener('mouseout', () => {
			button.style.backgroundColor = '#c7c7c7';
			button.style.color = '#333';
		});
	});

	let quantity = 1;
	decrementButton.addEventListener('click', () => {
		if (quantity > 1) {
			quantity -= 1;
			quantityDisplay.textContent = quantity;
		}
	});

	incrementButton.addEventListener('click', () => {
		quantity += 1;
		quantityDisplay.textContent = quantity;
	});
	
	quantityContainer.appendChild(decrementButton);
	quantityContainer.appendChild(quantityDisplay);
	quantityContainer.appendChild(incrementButton);
	sidetwo.appendChild(quantlbl);
	sidetwo.appendChild(quantityContainer);
	
	// Purchase Options Container
	const purchaseOptionsContainer = document.createElement('div');
	purchaseOptionsContainer.style.display = 'flex';
	purchaseOptionsContainer.style.gap = '15px';
	purchaseOptionsContainer.style.width = '55%';
	purchaseOptionsContainer.style.height = '75px';
	purchaseOptionsContainer.style.margin = '10px 0';

	// Add to Cart Button
	const addToCartButton = document.createElement('button');
	addToCartButton.textContent = 'ADD TO CART';
	addToCartButton.style.fontFamily = 'salmapro';
	addToCartButton.style.fontSize = '20px';
	addToCartButton.style.fontWeight = 'bold';
	addToCartButton.style.padding = '10px 20px';
	addToCartButton.style.border = 'none';
	addToCartButton.style.borderRadius = '5px';
	addToCartButton.style.backgroundColor = '#b8ced9';
	addToCartButton.style.color = '#333';
	addToCartButton.style.height = '85%';
	addToCartButton.style.cursor = 'pointer';
	addToCartButton.style.transition = 'background-color 0.3s, transform 0.3s';

	// Hover Effect for Add to Cart
	addToCartButton.addEventListener('mouseover', () => {
		addToCartButton.style.backgroundColor = '#879aa3';
	});
	addToCartButton.addEventListener('mouseout', () => {
		addToCartButton.style.backgroundColor = '#b8ced9';
	});
	addToCartButton.addEventListener('mousedown', () => {
		addToCartButton.style.transform = 'scale(0.95)';
	});
	addToCartButton.addEventListener('mouseup', () => {
		addToCartButton.style.transform = 'scale(1)';
	});

	// Buy Now Button
	const buyNowButton = document.createElement('button');
	buyNowButton.textContent = 'BUY NOW';
	buyNowButton.style.fontFamily = 'salmapro';
	buyNowButton.style.fontSize = '20px';
	buyNowButton.style.fontWeight = 'bold';
	buyNowButton.style.padding = '10px 20px';
	buyNowButton.style.border = 'none';
	buyNowButton.style.borderRadius = '5px';
	buyNowButton.style.backgroundColor = '#4286a8';
	buyNowButton.style.color = 'white';
	buyNowButton.style.height = '85%';
	buyNowButton.style.cursor = 'pointer';
	buyNowButton.style.transition = 'background-color 0.3s, transform 0.3s';

	buyNowButton.addEventListener('mouseover', () => {
		buyNowButton.style.backgroundColor = '#23536b';
	});
	buyNowButton.addEventListener('mouseout', () => {
		buyNowButton.style.backgroundColor = '#4286a8';
	});
	buyNowButton.addEventListener('mousedown', () => {
		buyNowButton.style.transform = 'scale(0.95)';
	});
	buyNowButton.addEventListener('mouseup', () => {
		buyNowButton.style.transform = 'scale(1)';
	});
	buyNowButton.addEventListener('click', () => {
		buyNow(item, selectedSize, quantity);
	});

	purchaseOptionsContainer.appendChild(addToCartButton);
	purchaseOptionsContainer.appendChild(buyNowButton);

	sidetwo.appendChild(purchaseOptionsContainer);
	
	
	// Details
	const descpContainer = document.createElement('div');
	descpContainer.style.marginBottom = '25px';

	const descpPreview = document.createElement('p');
	descpPreview.innerHTML = "See Details";
	descpPreview.style.fontFamily = 'salmapro';
	descpPreview.style.fontSize = '18px';
	descpPreview.style.opacity = '0.8';
	descpPreview.style.letterSpacing = '1px';
	descpPreview.style.cursor = 'pointer';
	descpPreview.style.color = 'white';
	descpPreview.style.textDecoration = 'underline';

	const descpFull = document.createElement('p');
	descpFull.innerHTML = item.details;
	descpFull.style.fontFamily = 'salmapro';
	descpFull.style.fontSize = '15px';
	descpFull.style.opacity = '0.5';
	descpFull.style.letterSpacing = '1px';
	descpFull.style.marginTop = '10px';
	descpFull.style.display = 'none';

	descpPreview.addEventListener('click', () => {
		const isExpanded = descpFull.style.display === 'block';
		descpFull.style.display = isExpanded ? 'none' : 'block';
		descpPreview.textContent = isExpanded ? "See Details" : 'Hide Details';
	});

	descpContainer.appendChild(descpPreview);
	descpContainer.appendChild(descpFull);
	sidetwo.appendChild(descpContainer);
		
	
    // Image
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.name;
    image.style.width = "35vw";
	image.style.height = "auto";
	image.style.display = "block";
	image.style.border = "3px solid white";
	image.style.borderRadius = '3px';
    image.style.height = 'auto';
	sideone.appendChild(image);
    
    // Close Button
    const closeButton = document.createElement('button');
    closeButton.textContent = "CLOSE";
    closeButton.style.padding = '10px 20px';
	closeButton.style.marginBottom = '40px';
    closeButton.style.fontSize = '16px';
    closeButton.style.backgroundColor = '#4286a8';
    closeButton.style.color = 'white';
	closeButton.style.fontWeight = "bold";
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '3px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        popup.remove();
		document.getElementsByTagName("body")[0].style.overflow = "auto";
    });
    
    popupContent.appendChild(closeButton);
    popupContent.appendChild(flexed);
    popup.appendChild(popupContent);

    document.body.appendChild(popup);
}

document.addEventListener("DOMContentLoaded", updateCartCount);

function buyNow(item, size, quantity) {
    if (!size) {
        alert("Please pick a size.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingOrderIndex = cart.findIndex(order => order.name === item.name && order.size === size);

    if (existingOrderIndex !== -1) {
        cart[existingOrderIndex].quantity += quantity;
    } else {
        const order = {
            name: item.name,
            creator: item.creator,
            price: item.saleprice || item.price,
            size: size,
            quantity: quantity,
            image: item.image
        };
        cart.push(order);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();

    showCartPopup();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCount = document.getElementById('cart-count');
    if (totalItems > 0) {
        cartCount.style.display = 'block';
        cartCount.textContent = totalItems;
    } else {
        cartCount.style.display = 'none';
    }
}

let isCartVisible = false;

function showCartPopup() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let popup = document.querySelector('.cart-popup');

    if (popup && isCartVisible) {
        closePopup(popup);
        return;
    }

    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'cart-popup';
        popup.addEventListener('click', () => closePopup(popup));

        const popupContent = document.createElement('div');
        popupContent.className = 'cart-popup-content';
        popupContent.removeEventListener('click', () => closePopup(popup));
        popupContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        const flexed = document.createElement('div');
        flexed.style.display = 'flex';

        const topArea = document.createElement('div');
        topArea.className = 'top-area';
        popupContent.appendChild(topArea);

        const shopLogo = document.createElement('img');
        shopLogo.src = "../Images/cart.png";
        shopLogo.style.height = '40pt';
        shopLogo.style.width = 'auto';
        shopLogo.style.padding = '4.5% 20px 20px';
        shopLogo.style.transform = 'scaleX(-1)';
        shopLogo.alt = "Shopping cart icon";
        shopLogo.style.cursor = 'pointer';
        shopLogo.addEventListener('click', () => closePopup(popup));
        flexed.appendChild(shopLogo);

        const title = document.createElement('h1');
        title.textContent = 'Your Cart';
        flexed.appendChild(title);
        topArea.appendChild(flexed);

        const itemsArea = document.createElement('div');
        itemsArea.className = 'cart-popup-items-area';
        topArea.appendChild(itemsArea);

        if (cart.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Your cart is empty.';
            itemsArea.appendChild(emptyMessage);
        } else {
            cart.forEach((order, index) => {
                const orderContainer = document.createElement('div');
                orderContainer.className = 'cart-popup-item-container';

                const itemImage = document.createElement('img');
                itemImage.src = order.image;
                itemImage.alt = order.name;
                itemImage.className = 'cart-popup-item-image';
                orderContainer.appendChild(itemImage);

                const itemDetails = document.createElement('div');
                itemDetails.className = 'cart-popup-item-details';

                const itemName = document.createElement('h3');
                itemName.textContent = order.name;
                itemName.className = 'cart-popup-item-name';
                itemDetails.appendChild(itemName);

                const itemSize = document.createElement('p');
                itemSize.textContent = `Size: ${order.size}`;
                itemSize.className = 'cart-popup-item-size';
                itemDetails.appendChild(itemSize);

                const itemQuantity = document.createElement('div');
                itemQuantity.className = 'cart-popup-item-quantity';

                const minusBtn = document.createElement('button');
                minusBtn.textContent = '-';
                minusBtn.addEventListener('click', () => updateQuantity(index, -1));
                itemQuantity.appendChild(minusBtn);

                const quantityText = document.createElement('p');
                quantityText.textContent = `${order.quantity}`;
                itemQuantity.appendChild(quantityText);

                const plusBtn = document.createElement('button');
                plusBtn.textContent = '+';
				plusBtn.style.borderRadius= '0px 10px 10px 0px';
                plusBtn.addEventListener('click', () => updateQuantity(index, 1));
                itemQuantity.appendChild(plusBtn);

                itemDetails.appendChild(itemQuantity);

                const itemPrice = document.createElement('p');
                order.price = order.price.replace("$", "");
                const price = parseFloat(order.price);
                itemPrice.textContent = `$${(price * order.quantity).toFixed(2)}`;
                itemPrice.className = 'cart-popup-item-price';
                itemDetails.appendChild(itemPrice);

                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.className = 'cart-popup-item-remove-btn';
                removeBtn.addEventListener('click', () => removeItem(index));
                itemDetails.appendChild(removeBtn);

                orderContainer.appendChild(itemDetails);
                itemsArea.appendChild(orderContainer);
            });

            const total = cart.reduce((acc, order) => acc + (parseFloat(order.price) * order.quantity), 0);
            const totalContainer = document.createElement('div');
            totalContainer.className = 'cart-popup-total';
            const totalText = document.createElement('p');
            totalText.textContent = `SUBTOTAL: $${total.toFixed(2)}`;
            totalContainer.appendChild(totalText);
            topArea.appendChild(totalContainer);
        }

        const buttonArea = document.createElement('div');
        buttonArea.className = 'button-area';
        popupContent.appendChild(buttonArea);

        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear Cart';
        clearButton.className = 'cart-popup-clear-btn';
        clearButton.addEventListener('click', () => {
            localStorage.removeItem('cart');
            updateCartCount();
            itemsArea.innerHTML = '<p class="cart-popup-empty">Your cart is empty.</p>';
        });
        buttonArea.appendChild(clearButton);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.className = 'cart-popup-close-btn';
        closeButton.addEventListener('click', () => closePopup(popup));
        buttonArea.appendChild(closeButton);

        popup.appendChild(popupContent);
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.style.backgroundColor = 'rgba(117, 144, 186, 0.2)';
            popupContent.style.transform = 'translateX(0)';
        }, 0);
    }

    isCartVisible = true;

    function closePopup(popup) {
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        popup.querySelector('.cart-popup-content').style.transform = 'translateX(100%)';
        setTimeout(() => {
            popup.remove();
            isCartVisible = false;
        }, 500);
    }

    function updateQuantity(index, change) {
        cart[index].quantity = Math.max(1, cart[index].quantity + change);
        localStorage.setItem('cart', JSON.stringify(cart));

        showCartPopup();
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        showCartPopup();
    }
}



