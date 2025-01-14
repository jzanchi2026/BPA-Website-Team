// fades the page in and out on load
window.addEventListener('load', function() {
    const body = document.querySelector('body');
    body.style.opacity = 1;
});

function fadeout(event) {
    event.preventDefault();

    const href = event.target.href || event.target.getAttribute('data-href');

    if (!href) {
        return;
    }

    const body = document.querySelector('body');
    body.style.transition = 'opacity 0.5s ease';
    body.style.opacity = 0;

    setTimeout(() => {
        window.location.href = href;
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

let boxHidden = true;
function goSettings() {
	let box = document.getElementById("settingpanel");
	if (boxHidden) {
        box.style.display = "flex";
		setTimeout(() => {
			box.style.transform = "translateX(0%)";
		}, 100);
    } else {
		box.style.transform = "translateX(-110%)";
        setTimeout(() => {
			box.style.display = "none";
		}, 500);
    }
	boxHidden = !boxHidden;
}

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

function dynamicTyping() {

	document.getElementById('pnumber').addEventListener('input', function (e) {
		let input = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
		let formatted = '';

		if (input.length > 0) formatted = '(' + input.substring(0, 3); // Add opening parenthesis
		if (input.length >= 4) formatted += ') ' + input.substring(3, 6); // Add closing parenthesis and space
		if (input.length >= 7) formatted += '-' + input.substring(6, 10); // Add dash for the last 4 digits

		e.target.value = formatted;
	});

}

let shownDiv = null;

document.addEventListener("DOMContentLoaded", () => {
    let booking = document.getElementById("booking");
	if (booking) {
		booking.style.display = "flex";
		booking.style.opacity = "1"; // Fully opaque
    }
	shownDiv = document.getElementById("booking"); // Default to the booking div
});

function bringUp(divv, passed) {
    let selected = document.getElementById(divv);
	document.getElementById("bringbook").style.backgroundColor = "black";
	document.getElementById("bringemail").style.backgroundColor = "black";
	document.getElementById("bringcust").style.backgroundColor = "black";
	passed.style.backgroundColor = "#101010";

    if (shownDiv && shownDiv != selected) {
        // Fade out the currently shown div
        shownDiv.style.opacity = "0";
        setTimeout(() => {
            // Hide the old div after fade-out is complete
            shownDiv.style.display = "none";
            showNewDiv(selected); // Show the new div
        }, 500); // Match the CSS transition time for fade-out
    }

    console.log("Current shownDiv:", shownDiv);
    console.log("Selected div:", selected);
}

function showNewDiv(selected) {
    selected.style.display = "flex"; // Make the selected div visible
    selected.style.opacity = "0"; // Start the new div with opacity 0 for fade-in
    setTimeout(() => {
        selected.style.opacity = "1"; // Fade in the new div
    }, 50); // Small delay for smoother transition
    shownDiv = selected; // Update the currently shown div
}


/*
const departments = ["men", "women", "unisex", "youth"];
const collections = ["accessories", "media", "apparel", "albums"];
const products1 = Array.from({ length: 183 }, (_, index) => ({
    name: `Product ${index + 1}`,
	id: index,
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

function buildFeatured(filteredProducts) {
    let content = document.getElementById("shopsnap");

    for (let i = 0; i < 4; i++) {
        const product = filteredProducts[i];
        let productCard = document.createElement("div");
        productCard.classList.add("home-product-card");
        productCard.style.backgroundImage = `url(${product.image})`;
        productCard.addEventListener("click", () => {
            popUp(product);
        });

        // Product Name
        let productNameLink = document.createElement("a");
        productNameLink.textContent = product.name.toUpperCase();
        productNameLink.classList.add("home-product-name");
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
        productPrice.classList.add("home-product-price");
        if (product.saleprice != null) {
            productPrice.innerHTML = `<s>${product.price}</s> <span>${product.saleprice}</span>`;
        } else {
            productPrice.textContent = product.price;
        }
        productCard.appendChild(productPrice);

        // Icon Bar
        let iconBar = document.createElement("div");
        iconBar.classList.add("icon-bar");

        // Placeholder icons
        let icon1 = document.createElement("img");
        icon1.src = "../Images/cart.png";
        icon1.alt = "Add to cart";

        let icon2 = document.createElement("img");
        icon2.src = "../Images/info.png";
		icon2.style.height = "25px";
        icon2.alt = "See more info";

        iconBar.appendChild(icon1);
        iconBar.appendChild(icon2);
        productCard.appendChild(iconBar);

        content.appendChild(productCard);
    }
}

window.addEventListener("load", (event) => {
	console.log("did");
	buildFeatured(products1);
});*/