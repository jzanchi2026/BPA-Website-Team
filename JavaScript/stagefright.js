// fades the page in and out on load
window.addEventListener('load', function() {
    const body = document.querySelector('body');
    body.style.opacity = 1;
});

function fadeout(event) {
    event.preventDefault();
    const body = document.querySelector('body');
    body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = event.target.href;
    }, 500);
}

// allows the navbar to be hidden
let isHidden = false;
function toggleNavbar() {
    const navbar = document.getElementById('navbar');
    isHidden = !isHidden;
    if (isHidden) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
}

// gives a ring of color to the cursor in bgg
/*document.addEventListener('DOMContentLoaded', () => {
    let gg = document.getElementById("bgg");
    let cursorRing = document.querySelector('.cursor-ring');
	
    if (gg) {
        gg.addEventListener('mouseenter', () => {
            cursorRing.style.opacity = 0.8;
        });

        gg.addEventListener('mouseleave', () => {
            cursorRing.style.opacity = 0;
        });

        gg.addEventListener('mousemove', (event) => {
			const rect = gg.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			const radius = rect.width / 4;

			const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
			if (distance < radius) {
				cursorRing.style.opacity = 0.3;
				cursorRing.style.left = `${event.clientX - 50}px`;
				cursorRing.style.top = `${event.clientY - 50}px`;
			} else {
				cursorRing.style.opacity = 0;
			}
		});
    }
});*/

// dynamically positions the text on bgg, hides pullup
window.addEventListener('DOMContentLoaded', () => {
    const scrollY = window.scrollY; 
    const h3 = document.getElementById('scrollingText');
    const h32 = document.getElementById('otherscrolling');
	
	var section = document.getElementById("pullup");
    section.classList.add("hidden");
	if (h3 != null)
		h3.style.transform = `translateX(${-scrollY}px)`;
	if (h32 != null)
    h32.style.transform = `translateX(${scrollY}px)`;
});

// dynamically scrolls the text on bgg
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const h3 = document.getElementById('scrollingText');
    const h32 = document.getElementById('otherscrolling');
	if (h3 != null)
		h3.style.transform = `translateX(${-scrollY}px)`;
	if (h32 != null)
    h32.style.transform = `translateX(${scrollY}px)`;
});

// pulls up the navbar onhover
let isOpen = false;
function pullup() {
    const footer = document.getElementById("pullup");
    if (!isOpen) {
        footer.classList.add("visible");
        isOpen = true;
    } else {
        footer.classList.remove("visible");
        isOpen = false;
    }
}

//works with shop page
function loadShop() {
    let content = document.getElementById("mainshop");
    content.innerHTML = "";

	//defines products
    const products1 = [
        { name: "Product 1", price: "$10.00", image: "https://via.placeholder.com/150", link: "#" },
        { name: "Product 2", price: "$20.00", image: "https://via.placeholder.com/150", link: "#" },
        { name: "Product 3", price: "$30.00", image: "https://via.placeholder.com/150", link: "#" },
        { name: "Product 4", price: "$40.00", image: "https://via.placeholder.com/150", link: "#" },
		{ name: "Product 4", price: "$40.00", image: "https://via.placeholder.com/150", link: "#" },
		{ name: "Product 4", price: "$40.00", image: "https://via.placeholder.com/150", link: "#" },
		{ name: "Product 4", price: "$40.00", image: "https://via.placeholder.com/150", link: "#" },
		{ name: "Product 4", price: "$40.00", image: "https://via.placeholder.com/150", link: "#" },
		{ name: "Product 4", price: "$40.00", image: "https://via.placeholder.com/150", link: "#" },
		{ name: "Product 4", price: "$40.00", image: "https://via.placeholder.com/150", link: "#" },
		{ name: "Product 4", price: "$40.00", image: "https://via.placeholder.com/150", link: "#" },
		{ name: "Product 4", price: "$40.00", image: "https://via.placeholder.com/150", link: "#" },
		{ name: "Product 5", price: "$40.00", image: "https://via.placeholder.com/150", link: "#" }
    ];
	
	//test products
	const products = Array.from({ length: 183 }, (_, index) => ({
		name: `Product ${index + 1}`,
		price: `$${(10 + index).toFixed(2)}`,
		image: "https://via.placeholder.com/150",
		link: "#",
		specialty: false,
	}));


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

            // product img
            let productImageLink = document.createElement("a");
            productImageLink.href = product.link;
            let productImage = document.createElement("img");
            //productImage.src = product.image;
            //productImage.alt = product.name;
            //productImage.style.width = "100%";
			productImage.style.width = "200px";
			productImage.style.height = "200px";
            productImage.style.display = "block";
            productImageLink.appendChild(productImage);
            productCard.appendChild(productImageLink);

            // product name
            let productNameLink = document.createElement("a");
            productNameLink.href = product.link;
            productNameLink.textContent = product.name.toUpperCase();
            productNameLink.style.display = "block";
            productNameLink.style.margin = "10px 0 5px";
            productNameLink.style.color = "white";
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

            // product price
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
        const paginationDiv = document.createElement("div");
        paginationDiv.style.textAlign = "center";
        paginationDiv.style.marginTop = "20px";

        const totalPages = Math.ceil(products.length / itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
			if (i != 1)
				pageButton.style.margin = "0 5px";
			else
				pageButton.style.margin = "0 5px 0 0";
            pageButton.style.padding = "10px 20px";
            pageButton.style.cursor = "pointer";
            pageButton.style.backgroundColor = "white";
            pageButton.style.color = "black";
			pageButton.style.fontSize = "10pt";
			pageButton.style.fontWeight = "bold";
            pageButton.addEventListener("click", () => {
                currentPage = i;
                renderPage(currentPage);
            });
			pageButton.addEventListener("mouseover", () => {
                pageButton.style.backgroundColor = "#a6a6a6";
            });
            pageButton.addEventListener("mouseout", () => {
                pageButton.style.backgroundColor = "white";
            });
            paginationDiv.appendChild(pageButton);
        }

        content.appendChild(paginationDiv);
    }

    renderPage(currentPage);
	
	function getTotal() {
		let output = document.getElementById("counted");
		output.innerHTML = products.length + " items";
	}
	
	getTotal();
}