const departments1 = ["men", "women", "unisex", "youth"];
const collections1 = ["accessories", "media", "apparel", "albums"];
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
        departments1: departments1[Math.floor(Math.random() * departments1.length)],
        collections1: collections1[Math.floor(Math.random() * collections1.length)],
    },
}));


function buildFeatured(filteredProducts) {
    let content = document.getElementById("shopsnap");
	const choices = ["APPAREL", "MEDIA", "ALBUMS", "CLEARANCE"];

    for (let i = 0; i < 4; i++) {
        const product = filteredProducts[i];
		let cc = choices[i];
        let productCard = document.createElement("div");
        productCard.classList.add("home-product-card");
        productCard.style.backgroundImage = `url(${product.image})`;
        productCard.addEventListener("click", () => {
            localStorage.setItem("shopChoice", cc); 
            const body = document.querySelector('body');
			body.style.transition = 'opacity 0.5s ease';
			body.style.opacity = 0;

			setTimeout(() => {
				window.location.href = "shop.html";
			}, 500);
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
		icon1.addEventListener("click", () => {
			event.stopPropagation();
            showCartPopup();
        });

        let icon2 = document.createElement("img");
        icon2.src = "../Images/info.png";
		icon2.style.height = "25px";
        icon2.alt = "See more info";
		icon2.addEventListener("click", () => {
            /*redirect to shop.html
				call popup(product)
			
			localStorage.setItem("item", product); 
            const body = document.querySelector('body');
			body.style.transition = 'opacity 0.5s ease';
			body.style.opacity = 0;

			setTimeout(() => {
				window.location.href = "shop.html";
			}, 500);*/
			
        });

        iconBar.appendChild(icon1);
        iconBar.appendChild(icon2);
        productCard.appendChild(iconBar);
        content.appendChild(productCard);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    buildFeatured(products1);
});