// Fades the page in and out on load
window.addEventListener('load', function () {
    const body = document.querySelector('body');
    body.style.transition = 'opacity 0.5s ease';
    body.style.opacity = 1;
});

window.addEventListener('pageshow', function (event) {
    const body = document.querySelector('body');
    body.style.opacity = 1;

    if (event.persisted) {
        body.style.transition = 'none';
        requestAnimationFrame(() => {
            body.style.transition = 'opacity 0.5s ease';
        });
    }
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

document.addEventListener("DOMContentLoaded", function () {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.5 }
    );

    reveals.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) {
            el.classList.add("show");
        } else {
            observer.observe(el);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const revealLefts = document.querySelectorAll(".revealleft");
    const revealRights = document.querySelectorAll(".revealright");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.8 }
    );

	revealLefts.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) {
            el.classList.add("show");
        } else {
            observer.observe(el);
        }
    });
	revealRights.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) {
            el.classList.add("show");
        } else {
            observer.observe(el);
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll(".row");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const elements = Array.from(entry.target.children);
                    elements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add("show");
                        }, index * 350);
                    });
                }
            });
        },
        { threshold: 0.5 }
    );

    rows.forEach((row) => {
        if (row.getBoundingClientRect().top < window.innerHeight) {
            Array.from(row.children).forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add("show");
                }, index * 350);
            });
        } else {
            observer.observe(row);
        }
    });
});



// Highlights the current page
window.addEventListener("DOMContentLoaded", () => {
	const navLinks = document.querySelectorAll("#navbar a");
	navLinks.forEach(link => {
		if (link.href === window.location.href) {
			link.style.textDecoration = "underline";
			link.style.textUnderlineOffset = "5px";
			link.style.textDecorationThickness = "3px";
		}
	});

});


// Updates cart count on load
document.addEventListener("DOMContentLoaded", updateCartCount);

// Allows the navbar to be hidden
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


// Handles footer visibility logic
document.addEventListener("DOMContentLoaded", () => {
    let isOpen = false;
    let isScrollTriggered = false;
    let isAtBottom = false;
    let toggled = false;

    const footer = document.getElementById("pullup");

    const toggleInputs = (disable) => {
        footer.style.pointerEvents = disable ? 'none' : 'auto';
    };

    const pullup = (open) => {
        if (open && (!isOpen || toggled)) {
            footer.classList.add("visible");
            toggleInputs(true);
            setTimeout(() => {
                isOpen = true;
                toggleInputs(false);
            }, 300);
        } else if (!open && isOpen) {
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

        isAtBottom = (scrollPosition >= pageHeight - 1) || (document.body.clientHeight <= window.innerHeight);

        if (isAtBottom) {
            if (!isOpen) {
                pullup(true);
            }
            isScrollTriggered = true;
        } else if (isScrollTriggered) {
            // Only close if previously triggered by bottom scroll
            pullup(false);
            isScrollTriggered = false;
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


// Automatically format some input areas
function dynamicTyping() {
    // Helper function for input capitalization
    function capitalizeInput(input) {
        input.addEventListener('input', function (e) {
            e.target.value = e.target.value
                .toLowerCase()
                .replace(/\b\w/g, char => char.toUpperCase());
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('pnumber');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let input = e.target.value.replace(/\D/g, '');
            let formatted = '';

            if (input.length > 0) formatted = '(' + input.substring(0, 3);
            if (input.length >= 4) formatted += ') ' + input.substring(3, 6);
            if (input.length >= 7) formatted += '-' + input.substring(6, 10);

            e.target.value = formatted;
        });
    }

    // Credit card number formatting
    const cardInput = document.getElementById('billingCardNumber');
    if (cardInput) {
        cardInput.addEventListener('input', function (e) {
            let input = e.target.value.replace(/\D/g, '');
            let formatted = '';

            for (let i = 0; i < input.length; i += 4) {
                if (formatted !== '') formatted += ' ';
                formatted += input.substring(i, i + 4);
            }

            e.target.value = formatted.trim();
        });
    }

    // Expiration date formatting MM/YY
    const expInput = document.getElementById('billingExpiration');
    if (expInput) {
        expInput.addEventListener('input', function (e) {
            let input = e.target.value.replace(/\D/g, '');
            let formatted = '';

            if (input.length > 2) {
                formatted = input.substring(0, 2) + '/' + input.substring(2, 4);
            } else {
                formatted = input;
            }

            e.target.value = formatted;
        });
    }

    // CVV formatting (3 or 4 digits)
    const cvvInput = document.getElementById('billingCVV');
    if (cvvInput) {
        cvvInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }

    // Zip code formatting (US format - 5 or 9 digits with optional dash)
    const zipInputs = document.querySelectorAll('#shippingZipCode, #billingZip');
    zipInputs.forEach(zipInput => {
        zipInput.addEventListener('input', function (e) {
            let input = e.target.value.replace(/\D/g, '');
            let formatted = '';

            if (input.length > 5) {
                formatted = input.substring(0, 5) + '-' + input.substring(5, 9);
            } else {
                formatted = input;
            }

            e.target.value = formatted.substring(0, 10);
        });
    });

    // Capitalize first letter of names and addresses
    const capitalizeInputs = document.querySelectorAll(
        '#shippingFirstName, #shippingLastName, #shippingAddress1, #shippingAddress2, #shippingCountry, #shippingCity, #shippingState, #billingFullName, #billingAddress, #billingAddress2, #billingCountry, #billingCity, #billingState'
    );
    capitalizeInputs.forEach(input => capitalizeInput(input));
}




document.addEventListener('DOMContentLoaded', dynamicTyping);


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

    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(cartCount => {
        if (cartCount) {
            if (totalItems > 0) {
                cartCount.style.display = 'block';
                cartCount.textContent = totalItems;
            } else {
                cartCount.style.display = 'none';
            }
        }
    });
}

function addTicketToCart(eventDetails, pricePerTicket, quantity, section) {
	
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingTicketIndex = cart.findIndex(ticket => 
        ticket.venue === eventDetails.venue && 
        ticket.section === section
    );

    if (existingTicketIndex !== -1) {
        cart[existingTicketIndex].quantity += quantity;
    } else {
        const ticket = {
            name: eventDetails.venue,
            date: eventDetails.date,
            city: eventDetails.city,
            address: eventDetails.address,
            section: section,
            price: pricePerTicket,
            quantity: quantity,
            id: eventDetails.id
        };

        cart.push(ticket);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCartPopup();
}


function addToCart(item, size, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingOrderIndex = cart.findIndex(order => 
        order.name === item.name && 
        (!item.requiresSizes || order.size === size)
    );

    if (existingOrderIndex !== -1) {
        cart[existingOrderIndex].quantity += quantity;
    } else {
        const order = {
            name: item.name,
            id: item.id,
            creator: item.creator,
            price: item.saleprice || item.price,
            quantity: quantity,
            image: item.image
        };

        if (item.requiresSizes) {
            order.size = size;
        }

        cart.push(order);
    }
	
    localStorage.setItem('cart', JSON.stringify(cart));
	updateCartCount();
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
		checkButton.addEventListener('click', () => {
			if (cart.length !== 0) {
				localStorage.removeItem('buyNowItem');
				fadeout(event);
			}
        });
        buttonArea.appendChild(checkButton);

        popup.appendChild(popupContent);
        document.body.appendChild(popup);
        updateTotal();
        slideInPopup(popupContent);
        setTimeout(() => {
            popup.style.opacity = '1';
        }, 0);
		
		updateCartContent(itemsArea);
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
				if (Array.isArray(order.image) && order.image.length > 0) {
					itemImage.src = order.image[0];
				} else {
					itemImage.src = order.image ? "../" + order.image : "Images/tourticketing.png";
				}
                itemImage.alt = order.name;
                itemImage.className = 'cart-popup-item-image';
                orderContainer.appendChild(itemImage);

                const itemDetails = document.createElement('div');
                itemDetails.className = 'cart-popup-item-details';

                const itemName = document.createElement('h3');
                itemName.textContent = order.name;
                itemName.className = 'cart-popup-item-name';
                itemDetails.appendChild(itemName);
				
                if (order.section) {
                    const itemSection = document.createElement('p');
                    itemSection.textContent = `Section ${order.section}`;
                    itemSection.className = 'cart-popup-item-size';
                    itemDetails.appendChild(itemSection);
                }

                if (order.date) {
                    const itemDate = document.createElement('p');
                    itemDate.textContent = `Date: ${order.date}`;
                    itemDate.className = 'cart-popup-item-size';
                    itemDetails.appendChild(itemDate);
                }

                // Standard shop item properties
				if (order.id) {
                    const idnum = document.createElement('p');
                    idnum.textContent = `ID: ${order.id}`;
                    idnum.className = 'cart-popup-item-size';
                    itemDetails.appendChild(idnum);
                }
				
                if (order.size) {
                    const itemSize = document.createElement('p');
                    itemSize.textContent = `Size: ${order.size}`;
                    itemSize.className = 'cart-popup-item-size';
                    itemDetails.appendChild(itemSize);
                }

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
				if (order.section || order.date) {
					
					plusBtn.addEventListener('click', () => {
						const selectedSection = document.querySelector(".selectedSection");
						let cart = JSON.parse(localStorage.getItem("cart")) || [];

						let totalQuantity = 0;
						cart.forEach(item => {
							if (item.section || item.date)
							totalQuantity += item.quantity;
						});

						if (totalQuantity + quantity > 8) {
							alert("You cannot purchase more than 8 tickets in total. You currently have " + totalQuantity + " tickets.");
						} else {
							updateQuantity(index, 1);
							updateCartCount();
						}
					});
				}
				else {
					plusBtn.addEventListener('click', () => {
						updateQuantity(index, 1);
						updateCartCount();
					});
				}
				
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
                trashIcon.src = 'Images/trash.png';
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
        const total = cart.reduce((acc, order) => {
            if (order.price && typeof order.price === 'string') {
                const price = parseFloat(order.price.replace(/[^0-9.-]+/g, ''));
                return acc + price * order.quantity;
            }
            return acc;
        }, 0);

        let totalItems = cart.reduce((acc, order) => acc + order.quantity, 0);
        document.querySelector('.cart-popup-total p').textContent = `SUBTOTAL: $${total.toFixed(2)}`;
        document.querySelector('.cart-popup-counts').textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    }
}




