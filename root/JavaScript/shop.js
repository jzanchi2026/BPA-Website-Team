function toggleFilters() {
	const categories = document.getElementById("categories");
	const hideFilters = document.getElementById("hideFilters");

	if (categories.classList.contains("active")) {
		categories.classList.remove("active");
		document.querySelector('body').style.overflowY = "auto";
		setTimeout(() => {
			hideFilters.style.display = "none";
		}, 300);
	} else {
		categories.classList.add("active");
		hideFilters.style.display = "block";
		document.querySelector('body').style.overflow = "hidden";
	}
}


// Global cart variable
let cart = null;

// Fetches product data from the JSON file and stores it
let products = [];

fetch('JavaScript/productList.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(jsonProducts => {
        products = jsonProducts;
        loadShop();
    })
    .catch(error => {
        console.error('Error loading the product data:', error);
    });
	
	

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

document.addEventListener("DOMContentLoaded", () => {
    const shopChoice = localStorage.getItem("shopChoice");
	const itemPassed = localStorage.getItem("item");

    if (shopChoice) {
        passChoice(shopChoice);
        localStorage.removeItem("shopChoice");
    }
	
	if (itemPassed) {
        popUp(JSON.parse(itemPassed));
        localStorage.removeItem("item");
    }
	
	document.querySelectorAll('#categories input[type="checkbox"]').forEach(checkbox => {
		checkbox.addEventListener('change', () => {
			loadShop();
			startTop();
		});
	});
});

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

    const itemsPerPage = 9;
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

			const productCollections = Array.isArray(product.filters.collections)
				? product.filters.collections
				: [product.filters.collections];

			const matchesCollection = collections.length === 0 || collections.some(c => {
				if (c.toLowerCase() === "clearance") {
					return product.saleprice !== null;
				}
				return productCollections.some(pCollection => pCollection.toLowerCase().includes(c.toLowerCase()));
			});

			const productDepartments = Array.isArray(product.filters.departments)
				? product.filters.departments
				: [product.filters.departments];

			const matchesDepartment = department.length === 0 || department.some(d =>
				productDepartments.some(pDepartment => pDepartment.toLowerCase() === d.toLowerCase())
			);

			const matchesPrice = priceRanges.length === 0 || matchesPriceRange(product.saleprice || product.price, priceRanges);

			if (isClearanceSelected) {
				if (collections.length > 1) {
					const matchesClearanceAndCollection = collections.some(c =>
						c.toLowerCase() !== "clearance" &&
						productCollections.some(pCollection => pCollection.toLowerCase().includes(c.toLowerCase()))
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
			if (Array.isArray(product.image) && product.image.length > 0) {
				productImage.src = product.image[0];
			} else {
				productImage.src = product.image;
			}
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

    const itemsPerPage = 9;
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
		if (Array.isArray(product.image) && product.image.length > 0) {
			productImage.src = product.image[0];
		} else {
			productImage.src = product.image;
		}
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
	popup.classList.add('popup');

	// Create the popup content box
	const popupContent = document.createElement('div');
	popupContent.classList.add('popup-content');

	// Configure the content's layout
	const flexed = document.createElement('div');
	flexed.classList.add('flexed');

	// Create side containers
	const sideone = document.createElement('div');
	sideone.classList.add('side-one');

	const sidetwo = document.createElement('div');
	sidetwo.classList.add('side-two');

	// Append the sides to the flex container
	flexed.appendChild(sideone);
	flexed.appendChild(sidetwo);

	popupContent.appendChild(flexed);

	popup.appendChild(popupContent);

	
	// Tags
	function createTag(text, sidetwo) {
		const tag = document.createElement('p');
		tag.textContent = text.toUpperCase();
		tag.classList.add('tag');

		if (sidetwo.children.length === 0) {
			tag.style.marginRight = '5px';
		}

		return tag;
	}

	// Limited edition
	if (item.limited) {
		const limited = createTag('LIMITED EDITION', sidetwo);
		sidetwo.appendChild(limited);
	}

	// Best seller 
	if (item.sellingvalue >= 80) {
		const bestSeller = createTag('BEST SELLER', sidetwo);
		sidetwo.appendChild(bestSeller);
	}

	// Department (Handle multiple values)
	if (item.filters.departments != null && Array.isArray(item.filters.departments)) {
		item.filters.departments.forEach(department => {
			const depart = createTag(department, sidetwo);
			sidetwo.appendChild(depart);
		});
	}

	// Collection (Handle multiple values)
	if (item.filters.collections != null && Array.isArray(item.filters.collections)) {
		item.filters.collections.forEach(collection => {
			const collect = createTag(collection, sidetwo);
			sidetwo.appendChild(collect);
		});
	}

    
    // Title
	const title = document.createElement('h2');
	title.textContent = item.name;
	title.classList.add('title');
	sidetwo.appendChild(title);

	// Creator
	const creator = document.createElement('p');
	creator.textContent = item.creator;
	creator.classList.add('creator');
	sidetwo.appendChild(creator);
	
	// ID
	const idnum = document.createElement('p');
	idnum.textContent = item.id;
	idnum.classList.add('idnum');
	sidetwo.appendChild(idnum);

	// Price
	if (item.saleprice !== undefined && item.saleprice !== null) {
		const ogprice = document.createElement('span');
		ogprice.textContent = item.price;
		ogprice.classList.add('original-price');

		const newprice = document.createElement('span');
		newprice.textContent = item.saleprice;
		newprice.classList.add('sale-price');

		const price = document.createElement('p');
		price.classList.add('price');
		price.appendChild(ogprice);
		price.appendChild(newprice);

		sidetwo.appendChild(price);
	} else {
		const price = document.createElement('p');
		price.textContent = item.price;
		price.classList.add('price');
		sidetwo.appendChild(price);
	}
	
	// Size alert container
	const sizeAlert = document.createElement('div');
	sizeAlert.style.fontFamily = "swanbold";
	sizeAlert.style.marginBottom = "20px";
	sizeAlert.innerHTML = "";
	
	let selectedSize = "";
	// Size selection
	if (item.requiresSizes == true) {
	
		const sizeContainer = document.createElement('div');
		sizeContainer.classList.add('size-container');

		
		const sizes = ['XS', 'S', 'M', 'L', 'XL'];

		// Add size buttons
		sizes.forEach(size => {
			const sizeButton = document.createElement('button');
			sizeButton.textContent = size;
			sizeButton.classList.add('size-button');

			sizeButton.addEventListener('click', () => {
				sizeAlert.innerHTML = "";
				Array.from(sizeContainer.children).forEach(btn => {
					btn.classList.remove('selected');
				});

				sizeButton.classList.add('selected');
				selectedSize = sizeButton.textContent;
			});

			sizeContainer.appendChild(sizeButton);
		});

		sidetwo.appendChild(sizeContainer);

		// Size chart setup
		const sizeChartContainer = document.createElement('div');
		sizeChartContainer.style.marginBottom = '35px';

		const toggleButton = document.createElement('button');
		toggleButton.innerHTML = "Size Chart <span style='float: right; font-weight: bold;'>+</span>";
		toggleButton.classList.add('size-chart-toggle');

		const sizeChartWrapper = document.createElement('div');
		sizeChartWrapper.classList.add('size-chart-wrapper');
		sizeChartWrapper.style.maxHeight = '0px'; // Initial state hidden
		sizeChartWrapper.style.overflow = 'hidden';
		sizeChartWrapper.style.transition = 'max-height 0.3s ease';

		const sizeChart = document.createElement('table');
		sizeChart.classList.add('size-chart');

		// Append elements
		sizeChartWrapper.appendChild(sizeChart);
		sizeChartContainer.appendChild(toggleButton);
		sizeChartContainer.appendChild(sizeChartWrapper);
		sidetwo.appendChild(sizeChartContainer);

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
			row.forEach(cell => {
				const cellTag = rowIndex === 0 ? 'th' : 'td';
				const td = document.createElement(cellTag);
				td.textContent = cell;
				td.classList.add(rowIndex === 0 ? 'header-cell' : 'data-cell');
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

	}
	
	// Quantity
	const quantlbl = document.createElement('p');
	quantlbl.textContent = 'Quantity:';
	quantlbl.classList.add('quantity-label');

	// Create quantity container
	const quantityContainer = document.createElement('div');
	quantityContainer.classList.add('quantity-container');

	// Create decrement button
	const decrementButton = document.createElement('button');
	decrementButton.textContent = '-';
	decrementButton.classList.add('quantity-button');

	// Create quantity display
	const quantityDisplay = document.createElement('div');
	quantityDisplay.textContent = '1';
	quantityDisplay.classList.add('quantity-display');

	// Create increment button
	const incrementButton = document.createElement('button');
	incrementButton.textContent = '+';
	incrementButton.classList.add('quantity-button');

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
	
	sidetwo.appendChild(sizeAlert);
	
	// Create Purchase Options Container
	const purchaseOptionsContainer = document.createElement('div');
	purchaseOptionsContainer.classList.add('purchase-options-container');

	// Add to Cart Button
	const addToCartButton = document.createElement('button');
	addToCartButton.textContent = 'ADD TO CART';
	addToCartButton.classList.add('button', 'add-to-cart-button');
	addToCartButton.addEventListener('click', () => {
		if (item.requiresSizes && selectedSize == "") {
			sizeAlert.innerHTML = "ALERT: Please pick a size to purchase this item!";
			return;
		}
		addToCart(item, selectedSize, quantity);
	});

	// Buy Now Button
	const buyNowButton = document.createElement('button');
	buyNowButton.textContent = 'BUY NOW';
	buyNowButton.classList.add('button', 'buy-now-button');
	buyNowButton.addEventListener('click', () => {
		if (item.requiresSizes && selectedSize == "") {
			sizeAlert.innerHTML = "ALERT: Please pick a size to purchase this item!";
			return;
		}
		buyNow(item, selectedSize, quantity);
	});

	purchaseOptionsContainer.appendChild(addToCartButton);
	purchaseOptionsContainer.appendChild(buyNowButton);

	sidetwo.appendChild(purchaseOptionsContainer);

	
	// Description Section
	const descpContainer = document.createElement('div');
	descpContainer.classList.add('description-container');

	const descpPreview = document.createElement('p');
	descpPreview.textContent = "See Details";
	descpPreview.classList.add('description-preview');

	const descpFull = document.createElement('p');
	descpFull.innerHTML = item.details;
	descpFull.classList.add('description-full');
	descpFull.style.maxHeight = '0';
	descpFull.style.overflow = 'hidden';
	descpFull.style.transition = 'max-height 0.3s ease';

	descpPreview.addEventListener('click', () => {
		const isExpanded = descpFull.style.maxHeight !== '0px';

		if (isExpanded) {
			descpFull.style.maxHeight = '0px';
			descpPreview.textContent = "See Details";
		} else {
			descpFull.style.maxHeight = `${descpFull.scrollHeight}px`;
			descpPreview.textContent = "Hide Details";
		}
	});

	descpContainer.appendChild(descpPreview);
	descpContainer.appendChild(descpFull);
	sidetwo.appendChild(descpContainer);


	// Image Section
	if (Array.isArray(item.image) && item.image.length > 1) {
		let currentImageIndex = 0;

		const imageContainer = document.createElement('div');
		imageContainer.classList.add('image-container');

		// Previous Button
		const prevButton = document.createElement('button');
		prevButton.textContent = '<';
		prevButton.classList.add('nav-button');
		prevButton.addEventListener('click', () => {
			currentImageIndex = (currentImageIndex - 1 + item.image.length) % item.image.length;
			updateMainImage();
		});
		imageContainer.appendChild(prevButton);

		// Main Image
		const image = document.createElement('img');
		image.src = item.image[currentImageIndex];
		image.alt = item.name;
		image.classList.add('popup-image-multi');
		imageContainer.appendChild(image);

		// Next Button
		const nextButton = document.createElement('button');
		nextButton.textContent = '>';
		nextButton.classList.add('nav-button');
		nextButton.addEventListener('click', () => {
			currentImageIndex = (currentImageIndex + 1) % item.image.length;
			updateMainImage();
		});
		imageContainer.appendChild(nextButton);

		

		// Image Preview Container
		const previewContainer = document.createElement('div');
		previewContainer.classList.add('image-preview-container');

		item.image.forEach((imgSrc, index) => {
			const previewImage = document.createElement('img');
			previewImage.src = imgSrc;
			previewImage.alt = `${item.name} Preview ${index + 1}`;
			previewImage.classList.add('preview-image');
			if (index === currentImageIndex) previewImage.classList.add('selected-preview');

			previewImage.addEventListener('click', () => {
				currentImageIndex = index;
				updateMainImage();
			});

			previewContainer.appendChild(previewImage);
		});
		imageContainer.appendChild(previewContainer);

		function updateMainImage() {
			image.src = item.image[currentImageIndex];
			Array.from(previewContainer.children).forEach((preview, index) => {
				preview.classList.toggle('selected-preview', index === currentImageIndex);
			});
		}
		sideone.appendChild(imageContainer);
		
	} else {
		const image = document.createElement('img');
		image.src = item.image;
		image.alt = item.name;
		image.classList.add('popup-image-single');
		sideone.appendChild(image);
	}


	// Close Button
	const closeButton = document.createElement('button');
	closeButton.textContent = "X";
	closeButton.classList.add('close-button');
	closeButton.addEventListener('click', () => {
		popup.remove();
		document.body.style.overflowX = "hidden";
		document.body.style.overflowY = "auto";
	});

	popupContent.appendChild(closeButton);
	popupContent.appendChild(flexed);
	popup.appendChild(popupContent);

	document.body.appendChild(popup);

}

function buyNow(item, size, quantity) {
	const productDetails = {
        name: item.name,
        id: item.id,
        price: item.price,
        size: size,
        quantity: quantity,
        image: Array.isArray(item.image) ? item.image[0] : item.image
    };
	localStorage.setItem('buyNowItem', JSON.stringify(productDetails));
	window.location.href = 'checkout.html';
}











