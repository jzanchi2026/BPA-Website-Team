// Builds product data for the featured shop section and shows purchase message
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('purchaseConfirmed') === 'true') {
        showThankYouMessage();
        localStorage.removeItem('purchaseConfirmed');
    }

    fetch('../JavaScript/productList.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(jsonProducts => {
            buildFeatured(jsonProducts);
        })
        .catch(error => {
            console.error('Error loading the product data:', error);
        });
});

function showThankYouMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('thank-you-message');
    
    const messageText = document.createElement('p');
    messageText.textContent = "Thank you for your purchase! Click anywhere to close.";
    
    messageContainer.addEventListener('click', () => {
        messageContainer.remove();
    });

    messageContainer.appendChild(messageText);
    
    document.body.appendChild(messageContainer);
}


// Utility function to handle transformations and fade-out effects for load-in section
function applyScrollEffects(element, translateX, scrollY) {
    if (element) {
        element.style.transform = `translateX(${translateX}px)`;
        element.style.opacity = Math.max(1 - scrollY / (window.innerHeight * 0.5) - 0.5, 0);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('pullup');
    if (section) section.classList.add('hidden');

    const scrollY = window.scrollY;
    applyScrollEffects(document.getElementById('scrollingText'), -scrollY, scrollY);
    applyScrollEffects(document.getElementById('otherscrolling'), scrollY, scrollY);
    applyScrollEffects(document.getElementById('seeDown'), -scrollY, scrollY);
});

document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    applyScrollEffects(document.getElementById('scrollingText'), -scrollY, scrollY);
    applyScrollEffects(document.getElementById('otherscrolling'), scrollY, scrollY);
    applyScrollEffects(document.getElementById('seeDown'), -scrollY, scrollY);
});


// Builds the html and css for the featured shop as well as the interactable aspect of it
function buildFeatured(jsonProducts) {
    let content = document.getElementById("shopsnap");
    const choices = ["APPAREL", "MEDIA", "ALBUMS", "CLEARANCE"];
    
    const featuredProducts = [jsonProducts[0], jsonProducts[10], jsonProducts[2], jsonProducts[5]];

    featuredProducts.forEach((product, index) => {
        let cc = choices[index];
        let productCard = document.createElement("div");
        productCard.classList.add("home-product-card");
        productCard.style.backgroundImage = `url(${product.image})`;

        // Product Name
        let productNameLink = document.createElement("a");
        productNameLink.textContent = product.name.toUpperCase();
        productNameLink.classList.add("home-product-name");
        if (product.limited) productNameLink.classList.add("limited");
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

        // Add to Cart Icon
        let icon1 = document.createElement("img");
        icon1.src = "../Images/cart.png";
        icon1.alt = "Add to cart";
        icon1.style.padding = "0 10px";

        const sizeOptions = document.createElement("div");
        sizeOptions.id = "home-size-options";
        sizeOptions.classList.add("home-size-options");

        // Add size buttons
        const sizes = ["XS", "S", "M", "L", "XL"];
        sizes.forEach((size) => {
            let sizeButton = document.createElement("button");
            sizeButton.textContent = size;
            sizeButton.classList.add("home-size-button");

            sizeButton.addEventListener("click", () => {
				addToCart(product, size, 1); 
				
				setTimeout(() => {
					sizeOptions.style.transform = "translateX(100%)";
					sizeOptions.style.opacity = "0";
				}, 600);
			});
		
            sizeOptions.appendChild(sizeButton);
        });

        productCard.appendChild(sizeOptions);

        // Flag to check hover state
        let isHoveringSizeOptions = false;
        
        // Handle hover on "Add to Cart" icon
        icon1.addEventListener("mouseenter", () => {
            sizeOptions.style.transform = "translateX(calc(0% - 6px)"; // Slide out
            sizeOptions.style.opacity = "1";
            sizeOptions.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
            icon1.style.transform = "scale(1.1)";
        });

        // Handle hover on the size options
        sizeOptions.addEventListener("mouseenter", () => {
            isHoveringSizeOptions = true;
            sizeOptions.style.transform = "translateX(calc(0% - 6px)";
            sizeOptions.style.opacity = "1";
            sizeOptions.style.transition = "transform 0.3s ease-in-out, opacity 0.3s ease-in-out";
        });

        // Handle mouse leave on both the icon and size options
        [icon1, sizeOptions].forEach((element) => {
            element.addEventListener("mouseleave", () => {
                if (!isHoveringSizeOptions) {
                    sizeOptions.style.transform = "translateX(100%)"; // Slide back in
                    sizeOptions.style.opacity = "0";
                    icon1.style.transform = "scale(1)"; // Reset the icon size
                }
            });
        });

        // Handle mouse leave from size options
        sizeOptions.addEventListener("mouseleave", () => {
            isHoveringSizeOptions = false;
            if (!icon1.matches(":hover")) { // Only slide back if neither is hovered
                sizeOptions.style.transform = "translateX(100%)"; // Slide back in
                sizeOptions.style.opacity = "0";
            }
        });

        // More Info Icon
        let icon2 = document.createElement("img");
        icon2.src = "../Images/info.png";
        icon2.href = "../HTML/shop.html";
        icon2.style.height = "25px";
        icon2.alt = "See more info";
        icon2.addEventListener("click", (event) => {
            event.stopPropagation();
            localStorage.setItem("item", JSON.stringify(product));
            const body = document.querySelector('body');
            body.style.transition = 'opacity 0.5s ease';
            body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = "shop.html";
            }, 500);
        });

        iconBar.appendChild(icon1);
        iconBar.appendChild(icon2);
        productCard.appendChild(iconBar);
        content.appendChild(productCard);
    });
}
