// fades the page in and out on load
window.addEventListener('load', function() {
    const body = document.querySelector('body');
	body.style.opacity = 1;
});

window.addEventListener("DOMContentLoaded", () => {
	const navLinks = document.querySelectorAll("#navbar a");
	navLinks.forEach(link => {
		if (link.href === window.location.href) {
		  link.style.textDecoration = "line-through";
		}
	});
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

/*let boxHidden = true;
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
}*/

// Handles the view of the footer, shows if user hovers on the pullup
document.addEventListener("DOMContentLoaded", () => {
    let isOpen = false;
    let isScrollTriggered = false;
    let isAtBottom = false;
    let inputs = document.querySelectorAll('input, textarea, button');
    let toggled = false;

    const toggleInputs = (disable) => {
        inputs.forEach(input => input.disabled = disable);
    };

    const pullup = (open) => {
        const footer = document.getElementById("pullup");

        if (open && (!isOpen || toggled)) {
            footer.classList.add("visible");
            toggleInputs(true);
            setTimeout(() => {
                isOpen = true;
                toggleInputs(false);
            }, 300);
        } else if (!open && isOpen && !isAtBottom) {
            footer.classList.remove("visible");
            toggleInputs(true);
            setTimeout(() => {
                isOpen = false;
                toggleInputs(false);
            }, 300);
        }
    };

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        isAtBottom = scrollPosition >= pageHeight;

        if (isAtBottom || toggled) {
            if (!isOpen) {
                pullup(true);
            }
            isScrollTriggered = true;
        } else {
            if (isScrollTriggered || !toggled) {
                isScrollTriggered = false;
                pullup(false);
            }
        }
    });

    const hrContainer = document.querySelector(".hr-container");

    if (hrContainer) {
        hrContainer.addEventListener("mouseenter", () => {
            if (!isOpen && !isAtBottom) {
                pullup(true);
            }
        });

        hrContainer.addEventListener("mouseleave", () => {
            if (isOpen && !isAtBottom && !toggled) {
                pullup(false);
            }
        });
    }

    window.toggleLinks = function () {
        let links = document.getElementById("displayedLinks");
		let header = document.getElementById("navbar-mobile");
        const footer = document.getElementById("pullup");

        if (!toggled) {
            links.style.display = "flex";
			links.style.opacity = "1";
				header.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                pullup(true);
            setTimeout(() => {
                links.style.transform = "translateX(0)";
                
            }, 1);
        } else {
            links.style.transform = "translateX(-120%)";
			header.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
			pullup(false);
            setTimeout(() => {
                links.style.display = "none";  
            }, 300);
        }
        toggled = !toggled;
    };
});




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
    selected.style.display = "flex";
    selected.style.opacity = "0";
    setTimeout(() => {
        selected.style.opacity = "1";
    }, 50);
    shownDiv = selected; 
}



// CART CODING

let isCartVisible = false;
let closeCart = true;

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCount = document.getElementById('cart-count');
	if (cartCount) {
		if (totalItems > 0) {
			cartCount.style.display = 'block';
			cartCount.textContent = totalItems;
		} else {
			cartCount.style.display = 'none';
		}
	}
}

function addToCart(item, size, quantity) {
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
			id: item.id,
			creator: item.creator,
			price: item.saleprice || item.price,
			size: size,
			quantity: quantity,
			image: item.image
		};
		cart.push(order);
	}

	localStorage.setItem('cart', JSON.stringify(cart));

	showCartPopup();
}

function showCartPopup() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let popup = document.querySelector('.cart-popup');

    if (popup && isCartVisible) {
        closePopup(popup);
        return;
    }

    if (!popup) {
        popup = document.createElement('div');
        popup.className = 'cart-popup';
        popup.addEventListener('click', () => closePopup(popup));
		popup.style.transition = 'opacity 0.3s ease-in-out';

        const popupContent = document.createElement('div');
        popupContent.className = 'cart-popup-content';
        popupContent.addEventListener('click', (e) => e.stopPropagation());

        const flexed = document.createElement('div');
        flexed.style.display = 'flex';

        const topArea = document.createElement('div');
        topArea.className = 'top-area';
        popupContent.appendChild(topArea);

        const shopLogo = document.createElement('img');
        shopLogo.src = "../Images/cart.png";
        shopLogo.style.height = '40pt';
        shopLogo.style.width = 'auto';
        shopLogo.style.padding = '4.5% 35px 20px 20px';
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

        const totalContainer = document.createElement('div');
        totalContainer.className = 'cart-popup-total';
        const totalText = document.createElement('p');
        totalContainer.appendChild(totalText);
        topArea.appendChild(totalContainer);

        const itemNum = document.createElement('p');
        itemNum.className = 'cart-popup-counts';
        topArea.appendChild(itemNum);

        if (cart.length === 0) {
            itemsArea.innerHTML = '<p style="padding: 10px; font-weight: bold;" class="cart-popup-empty">YOUR CART IS EMPTY</p>';
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
                minusBtn.addEventListener('click', () => {
				
				updateQuantity(index, -1);
				updateCartCount();
				
				});
                itemQuantity.appendChild(minusBtn);

                const quantityText = document.createElement('p');
                quantityText.textContent = `${order.quantity}`;
                itemQuantity.appendChild(quantityText);

                const plusBtn = document.createElement('button');
                plusBtn.textContent = '+';
				plusBtn.style.borderRadius = "0 10px 10px 0";
                plusBtn.addEventListener('click', () => {
				
					updateQuantity(index, 1);
					updateCartCount();
				
				});
                itemQuantity.appendChild(plusBtn);

                itemDetails.appendChild(itemQuantity);

                const priceRemove = document.createElement('div');
                priceRemove.className = 'cart-popup-item-prices';

                const itemPrice = document.createElement('p');
                const price = parseFloat(order.price.replace("$", ""));
                itemPrice.textContent = `$${(price * order.quantity).toFixed(2)}`;
                itemPrice.className = 'cart-popup-item-price';
                priceRemove.appendChild(itemPrice);

                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.addEventListener('click', () => {
					removeItem(index);
					updateCartCount();
				});
                priceRemove.appendChild(removeBtn);

                const trashIcon = document.createElement('img');
                trashIcon.src = '../Images/trash.png';
                trashIcon.alt = 'Remove item';
                trashIcon.style.height = '20px';
                trashIcon.style.width = 'auto';
                removeBtn.appendChild(trashIcon);

                orderContainer.appendChild(itemDetails);
                orderContainer.appendChild(priceRemove);
                itemsArea.appendChild(orderContainer);
            });
        }

        const buttonArea = document.createElement('div');
        buttonArea.className = 'button-area';
        popupContent.appendChild(buttonArea);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.className = 'cart-popup-close-btn';
        closeButton.addEventListener('click', () => closePopup(popup));
        buttonArea.appendChild(closeButton);

        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear Cart';
        clearButton.className = 'cart-popup-clear-btn';
        clearButton.addEventListener('click', () => {
				localStorage.removeItem('cart');
				cart = [];
				updateCartContent(itemsArea);
				updateCartCount();
        });
        buttonArea.appendChild(clearButton);

        const checkButton = document.createElement('button');
        checkButton.textContent = 'Checkout';
		checkButton.href = "checkout.html";
        checkButton.className = 'cart-popup-check-btn';
        checkButton.setAttribute('data-href', 'checkout.html');
		checkButton.addEventListener('click', fadeout);
        buttonArea.appendChild(checkButton);

        popup.appendChild(popupContent);
        document.body.appendChild(popup);
		updateTotal();
        slideInPopup(popupContent);
		setTimeout(() => {
			popup.style.opacity = '1';
		}, 0);
    }

    function slideInPopup(popupContent) {
        popupContent.style.transform = 'translateX(100%)';
        popupContent.style.transition = 'transform 0.3s ease-out';

        setTimeout(() => {
            popupContent.style.transform = 'translateX(calc(-2.5%)';
        }, 0);
    }

    isCartVisible = true;

    function closePopup(popup) {
		const popupContent = popup.querySelector('.cart-popup-content');
		popupContent.style.transform = 'translateX(100%)';

		popup.style.opacity = '0';

		setTimeout(() => {
			popup.remove();
			isCartVisible = false;
		}, 300);
	}

    function updateQuantity(index, change) {
        cart[index].quantity = Math.max(1, cart[index].quantity + change);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartContent(document.querySelector('.cart-popup-items-area'));
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartContent(document.querySelector('.cart-popup-items-area'));
    }
	

    function updateCartContent(itemsArea) {
        if (cart.length === 0) {
            itemsArea.innerHTML = '<p style="padding: 10px; font-weight: bold;" class="cart-popup-empty">YOUR CART IS EMPTY</p>';
        } else {
            itemsArea.innerHTML = '';
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
                minusBtn.addEventListener('click', () => {
					updateQuantity(index, -1);
					updateCartCount();
				});
                itemQuantity.appendChild(minusBtn);

                const quantityText = document.createElement('p');
                quantityText.textContent = `${order.quantity}`;
                itemQuantity.appendChild(quantityText);

                const plusBtn = document.createElement('button');
                plusBtn.textContent = '+';
				plusBtn.style.borderRadius = "0 10px 10px 0";
				plusBtn.addEventListener('click', () => {
					updateQuantity(index, 1);
					updateCartCount();
				});
                itemQuantity.appendChild(plusBtn);

                itemDetails.appendChild(itemQuantity);

                const priceRemove = document.createElement('div');
                priceRemove.className = 'cart-popup-item-prices';

                const itemPrice = document.createElement('p');
                const price = parseFloat(order.price.replace("$", ""));
                itemPrice.textContent = `$${(price * order.quantity).toFixed(2)}`;
                itemPrice.className = 'cart-popup-item-price';
                priceRemove.appendChild(itemPrice);

                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.addEventListener('click', () => {
					removeItem(index);
					updateCartCount();
				});
                priceRemove.appendChild(removeBtn);

                const trashIcon = document.createElement('img');
                trashIcon.src = '../Images/trash.png';
                trashIcon.alt = 'Remove item';
                trashIcon.style.height = '20px';
                trashIcon.style.width = 'auto';
                removeBtn.appendChild(trashIcon);

                orderContainer.appendChild(itemDetails);
                orderContainer.appendChild(priceRemove);
                itemsArea.appendChild(orderContainer);
            });
        }

        updateTotal();
    }

    function updateTotal() {
        const total = cart.reduce((acc, order) => acc + parseFloat(order.price.replace(/[^0-9.-]+/g, '')) * order.quantity, 0);
        let totalItems = cart.reduce((acc, order) => acc + order.quantity, 0);
        document.querySelector('.cart-popup-total p').textContent = `SUBTOTAL: $${total.toFixed(2)}`;
        document.querySelector('.cart-popup-counts').textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    }
}

