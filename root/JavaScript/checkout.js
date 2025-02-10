
let total = 0;

function renderCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const buyNowItem = JSON.parse(localStorage.getItem('buyNowItem'));

    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const totalPriceElement = document.getElementById('subtotalPrice');
    const itemCountElement = document.getElementById('itemCount');
    const itemShippingElement = document.getElementById('itemShipping');
    const itemTaxesElement = document.getElementById('itemTaxes');
    const totalElement = document.getElementById('totalPrice');
	
	let subtotal = 0;
    let shipping = 8.99;
    let taxRate = 0.0725;
    

    if (buyNowItem) {
        cartItemsContainer.innerHTML = '';

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const itemImage = document.createElement('img');
        itemImage.src = Array.isArray(buyNowItem.image) ? buyNowItem.image[0] : buyNowItem.image;
        itemImage.alt = buyNowItem.name;
        cartItem.appendChild(itemImage);

        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');

        const itemName = document.createElement('p');
        itemName.classList.add('cart-item-name');
        itemName.textContent = buyNowItem.name;
        itemDetails.appendChild(itemName);
		
		const itemPrice = document.createElement('p');
        itemPrice.classList.add('cart-item-size');
        itemPrice.textContent = `Price: ${buyNowItem.price}`;
        itemDetails.appendChild(itemPrice);
		
		const itemID = document.createElement('p');
        itemID.classList.add('cart-item-size');
        itemID.textContent = `ID: ${buyNowItem.id}`;
        itemDetails.appendChild(itemID);

        
		if (buyNowItem.size) {
			const itemSize = document.createElement('p');
			itemSize.classList.add('cart-item-size');
			itemSize.textContent = `Size: ${buyNowItem.size}`;
			itemDetails.appendChild(itemSize);
		}

        const itemQuantity = document.createElement('p');
        itemQuantity.classList.add('cart-item-quantity');
        itemQuantity.textContent = `Qty: ${buyNowItem.quantity}`;
        itemDetails.appendChild(itemQuantity);

        const itemTotal = document.createElement('p');
        let newtot = buyNowItem.price.replace("$", "");
        const itemTotalPrice = parseFloat(newtot) * buyNowItem.quantity;
        itemTotal.classList.add('cart-item-price');
        itemTotal.textContent = `Total: $${itemTotalPrice.toFixed(2)}`;
        itemDetails.appendChild(itemTotal);

        cartItem.appendChild(itemDetails);

        cartItemsContainer.appendChild(cartItem);
		
		subtotal = itemTotalPrice;
        total = subtotal + shipping + (subtotal * taxRate);

        itemCountElement.textContent = buyNowItem.quantity;
        totalPriceElement.textContent = `$${subtotal.toFixed(2)}`;
        itemShippingElement.textContent = `$${shipping.toFixed(2)}`;
        itemTaxesElement.textContent = `$${(subtotal * taxRate).toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;


    } else if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p style='font-family:arial narrow;margin:15px;font-size:13pt'>YOUR CART IS EMPTY</p>";
        itemCountElement.textContent = '0';
        totalPriceElement.textContent = '0.00';
        itemShippingElement.textContent = '0.00';
        itemTaxesElement.textContent = '0.00';
        totalElement.textContent = '0.00';
    } else {
        cartItemsContainer.innerHTML = '';
		subtotal = 0;
        let itemTotalPrice = 0;

        cart.forEach((order) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-btn');

            removeButton.addEventListener('click', () => {
                const index = cart.findIndex(item => item === order);
                if (index > -1) {
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartSummary();
                }
            });
            cartItem.appendChild(removeButton);

            const itemImage = document.createElement('img');
            itemImage.src = Array.isArray(order.image) ? order.image[0] : order.image;
            itemImage.alt = order.name;
            cartItem.appendChild(itemImage);

            const itemDetails = document.createElement('div');
            itemDetails.classList.add('item-details');

            const itemName = document.createElement('p');
            itemName.classList.add('cart-item-name');
            itemName.textContent = order.name;
            itemDetails.appendChild(itemName);
			
			const itemPrice = document.createElement('p');
			itemPrice.classList.add('cart-item-size');
			itemPrice.textContent = `Price: ${order.price}`;
			itemDetails.appendChild(itemPrice);
			
			if (order.section) {
				itemImage.src = "../Images/tourticketing.png";
			
                const itemDate = document.createElement('p');
                itemDate.classList.add('cart-item-size');
                itemDate.textContent = `Date: ${order.date}`;
                itemDetails.appendChild(itemDate);

                const itemSection = document.createElement('p');
                itemSection.classList.add('cart-item-size');
                itemSection.textContent = `Section: ${order.section}`;
                itemDetails.appendChild(itemSection);
            }
			
			if (order.id) {
				const itemID = document.createElement('p');
				itemID.classList.add('cart-item-size');
				itemID.textContent = `ID: ${order.id}`;
				itemDetails.appendChild(itemID);
			}

            if (order.size) {
				const itemSize = document.createElement('p');
				itemSize.classList.add('cart-item-size');
				itemSize.textContent = `Size: ${order.size}`;
				itemDetails.appendChild(itemSize);
			}

            const itemQuantity = document.createElement('p');
            itemQuantity.classList.add('cart-item-quantity');
            itemQuantity.textContent = `Qty: ${order.quantity}`;
            itemDetails.appendChild(itemQuantity);

            const itemTotal = document.createElement('p');
            let newtot = order.price.replace("$", "");
            const itemTotalPrice = parseFloat(newtot) * order.quantity;
            itemTotal.classList.add('cart-item-price');
            itemTotal.textContent = `Total: $${itemTotalPrice.toFixed(2)}`;
            itemDetails.appendChild(itemTotal);

            cartItem.appendChild(itemDetails);

            cartItemsContainer.appendChild(cartItem);

            subtotal += itemTotalPrice;
			total = subtotal + shipping + (subtotal * taxRate);
        });

		let shippingTotal = shipping;
        let taxTotal = subtotal * taxRate;
        let grandTotal = subtotal + shippingTotal + taxTotal;

        itemCountElement.textContent = cart.reduce((sum, order) => sum + order.quantity, 0);
        totalPriceElement.textContent = `$${subtotal.toFixed(2)}`;
        itemShippingElement.textContent = `$${shippingTotal.toFixed(2)}`;
        itemTaxesElement.textContent = `$${taxTotal.toFixed(2)}`;
        totalElement.textContent = `$${grandTotal.toFixed(2)}`;
    }
}


window.addEventListener("load", (event) => {
    renderCartSummary();
});

function validateFields(section) {
    const requiredFields = section.querySelectorAll('.address-input[required]');
    let isValid = true;
    let firstErrorField = null;

    requiredFields.forEach(field => {
        const value = field.value.trim();
        const label = field.previousElementSibling;

        const errorMessage = field.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }

        if (!value) {
            isValid = false;
            showError(field, label, "This field is required.");
        } else {
            field.classList.remove('error');
        }

        if (field.placeholder === "Enter your email" && !isValidEmail(value)) {
            isValid = false;
            showError(field, label, "Please enter a valid email address.");
        }

        if (field.placeholder === "Enter your zip code" && !/^\d{5}(-\d{4})?$/.test(value)) {
            isValid = false;
            showError(field, label, "Please enter a valid zip code (e.g., 12345 or 12345-6789).");
        }

        if (field.id === "billingCardNumber" && !isValidCreditCard(value.replace(/\s/g, ''))) {
            isValid = false;
            showError(field, label, "Please enter a valid credit card number.");
        }

        if (field.id === "billingExpiration" && !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) {
            isValid = false;
            showError(field, label, "Please enter a valid expiration date (MM/YY).");
        }

        if (field.id === "billingCVV" && !/^\d{3,4}$/.test(value)) {
            isValid = false;
            showError(field, label, "Please enter a valid CVV (3 or 4 digits).");
        }

        if (field.classList.contains('error') && !firstErrorField) {
            firstErrorField = field;
        }
    });

    if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
}

function showError(field, label, message) {
    field.classList.add('error');
    
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;

    if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
        field.nextElementSibling.remove();
    }

    field.parentNode.appendChild(errorMessage);
}


function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

function isValidCreditCard(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10 === 0);
}

document.addEventListener("DOMContentLoaded", () => {
    const shippingSection = document.getElementById("shippingSection");
    const billingSection = document.getElementById("billingSection");
    const reviewSection = document.getElementById("reviewSection");
    const toggleToBilling = document.getElementById("toggleToBilling");
    const toggleToShipping = document.getElementById("toggleToShipping");
    const toggleToReview = document.getElementById("toggleToReview");
    const sameAsShipping = document.getElementById("sameAsShipping");
    const purchaseButton = document.getElementById("checkout-btn");
    const backToBilling = document.getElementById("backToBilling");

    sameAsShipping.addEventListener("change", () => {
        const shippingFirstName = document.querySelector("#shippingSection input[placeholder='Enter your first name']");
        const shippingLastName = document.querySelector("#shippingSection input[placeholder='Enter your last name']");
        const shippingAddress = document.querySelector("#shippingSection input[placeholder='Enter your address']");
        const shippingAddress2 = document.querySelector("#shippingSection input[placeholder='Enter your apartment, suite, etc.']");
        const shippingCountry = document.querySelector("#shippingSection input[placeholder='Enter your country']");
        const shippingCity = document.querySelector("#shippingSection input[placeholder='Enter your city']");
        const shippingState = document.querySelector("#shippingSection input[placeholder='Enter your state']");
        const shippingZip = document.querySelector("#shippingSection input[placeholder='Enter your zip code']");
        const shippingEmail = document.querySelector("#shippingSection input[placeholder='Enter your email']");

        if (sameAsShipping.checked) {
            if (shippingFirstName && shippingLastName && shippingAddress && shippingCountry && shippingCity && shippingState && shippingZip && shippingEmail) {
                document.getElementById("billingFullName").value = shippingFirstName.value + ' ' + shippingLastName.value;
                document.getElementById("billingAddress").value = shippingAddress.value;
                document.getElementById("billingAddress2").value = shippingAddress2.value;
                document.getElementById("billingCountry").value = shippingCountry.value;
                document.getElementById("billingCity").value = shippingCity.value;
                document.getElementById("billingState").value = shippingState.value;
                document.getElementById("billingZip").value = shippingZip.value;
            }
        } else {
            document.getElementById("billingFullName").value = '';
            document.getElementById("billingAddress").value = '';
            document.getElementById("billingAddress2").value = '';
            document.getElementById("billingCountry").value = '';
            document.getElementById("billingCity").value = '';
            document.getElementById("billingState").value = '';
            document.getElementById("billingZip").value = '';
        }
    });

    toggleToBilling.addEventListener("click", () => {
        if (validateFields(shippingSection)) {
            shippingSection.style.display = "none";
            billingSection.style.display = "block";
        } else {
            document.getElementById("error-message").innerHTML = "Please fill in all required fields correctly before proceeding.";
        }
    });

    backToBilling.addEventListener("click", () => {
        reviewSection.style.display = "none";
        billingSection.style.display = "block";
    });

    toggleToShipping.addEventListener("click", () => {
        billingSection.style.display = "none";
        shippingSection.style.display = "block";
    });

    toggleToReview.addEventListener("click", () => {
        if (validateFields(billingSection)) {
            populateReviewSection();
            billingSection.style.display = "none";
            reviewSection.style.display = "block";
        } else {
            document.getElementById("error-message2").innerHTML = "Please fill in all required fields correctly before proceeding.";
        }
    });

    purchaseButton.addEventListener("click", () => {
        if (validateFields(shippingSection) && validateFields(billingSection)) {
            passData();
        } else {
            document.getElementById("error-message").innerHTML = "Please fill in all required fields correctly before proceeding.";
        }
    });
});

function populateReviewSection() {
    function setText(id, value) {
        document.getElementById(id).textContent = value || '';
    }

    setText("reviewFullName", `${document.getElementById("shippingFirstName").value} ${document.getElementById("shippingLastName").value}`);
    setText("reviewShippingAddress1", document.getElementById("shippingAddress1").value);
    if (document.getElementById("shippingAddress2").value !== "") {
        setText("reviewShippingAddress2", document.getElementById("shippingAddress2").value);
    } else {
        setText("reviewShippingAddress2", "NA");
    }
    setText("reviewShippingCity", document.getElementById("shippingCity").value);
    setText("reviewShippingState", document.getElementById("shippingState").value);
    setText("reviewShippingCountry", document.getElementById("shippingCountry").value);
    setText("reviewShippingZipCode", document.getElementById("shippingZipCode").value);
    setText("reviewEmail", document.getElementById("shippingEmail").value);

    setText("reviewBillingFullName", document.getElementById("billingFullName").value);
    setText("reviewBillingAddress1", document.getElementById("billingAddress").value);
    if (document.getElementById("billingAddress2").value !== "") {
        setText("reviewBillingAddress2", document.getElementById("billingAddress2").value);
    } else {
        setText("reviewBillingAddress2", "NA");
    }
    setText("reviewBillingCity", document.getElementById("billingCity").value);
    setText("reviewBillingState", document.getElementById("billingState").value);
    setText("reviewBillingCountry", document.getElementById("billingCountry").value);
    setText("reviewBillingZipCode", document.getElementById("billingZip").value);
    setText("reviewPhone", document.getElementById("pnumber").value);

    setText("reviewCardNumber", maskCardNumber(document.getElementById("billingCardNumber").value).replace(/\s+/g, '').trim());
    setText("reviewCardExpiration", document.getElementById("billingExpiration").value);
    setText("reviewCardCVV", '***');

    setText("reviewOrderId", generateOrderId());
    setText("reviewTotal", (total || 0).toFixed(2));
}

function maskCardNumber(cardNumber) {
    const nonFormat = cardNumber.replace(/\s+/g, '');
    return nonFormat.slice(0, -4).replace(/\d/g, '*') + nonFormat.slice(-4);
}

function generateOrderId() {
    return 'ORD-' + Math.floor(Math.random() * 900000 + 100000);
}


function passData() {
    const getInputValue = (selector) => {
        const element = document.querySelector(selector);
        return element ? element.value : '';
    };

    const shippingDetails = {
        firstName: getInputValue("#shippingSection input[placeholder='Enter your first name']"),
        lastName: getInputValue("#shippingSection input[placeholder='Enter your last name']"),
        address: getInputValue("#shippingSection input[placeholder='Enter your address']"),
        address2: getInputValue("#shippingSection input[placeholder='Enter your apartment, suite, etc.']"),
        country: getInputValue("#shippingSection input[placeholder='Enter your country']"),
        city: getInputValue("#shippingSection input[placeholder='Enter your city']"),
        state: getInputValue("#shippingSection input[placeholder='Enter your state']"),
        zip: getInputValue("#shippingSection input[placeholder='Enter your zip code']"),
        email: getInputValue("#shippingSection input[placeholder='Enter your email']")
    };

    const billingDetails = {
        fullName: getInputValue("#billingFullName"),
        address: getInputValue("#billingAddress"),
        address2: getInputValue("#billingAddress2"),
        country: getInputValue("#billingCountry"),
        city: getInputValue("#billingCity"),
        state: getInputValue("#billingState"),
        zip: getInputValue("#billingZip"),
        phone: getInputValue("#pnumber"),
        cardNumber: getInputValue("#billingCardNumber"),
        expiration: getInputValue("#billingExpiration"),
        cvv: getInputValue("#billingCVV")
    };

    const orderId = getInputValue("#reviewOrderId");
	console.log(orderId);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;
    cart.forEach(item => {
        const itemPrice = parseFloat(item.price.replace('$', '')) * item.quantity;
        totalPrice += itemPrice;
    });

    const purchaseDetails = {
        shipping: shippingDetails,
        billing: billingDetails,
        orderId: orderId,
        cart: cart,
        totalPrice: totalPrice.toFixed(2)
    };

    sendPurchaseEmail(purchaseDetails);
}


function sendPurchaseEmail(details) {
    const getValue = (value, defaultValue = "N/A") => {
        return value != null && value.toString().trim() !== "" ? value.toString() : defaultValue;
    };

    const cartSummary = Array.isArray(details.cart) && details.cart.length > 0
        ? details.cart.map(item => {
            const name = getValue(item?.name);
            const quantity = item?.quantity || 0;
            const price = getValue(item?.price, "0.00");
            const totalPrice = item?.price && item?.quantity
                ? (parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)
                : "0.00";

            return `${name} (Qty: ${quantity}, Price: ${price}, Total: $${totalPrice})`;
        }).join("\n")
        : "No items in the cart";

    const emailData = {
        shipping_first_name: getValue(details?.shipping?.firstName),
        shipping_last_name: getValue(details?.shipping?.lastName),
        shipping_address: getValue(details?.shipping?.address),
        shipping_address2: getValue(details?.shipping?.address2),
        shipping_city: getValue(details?.shipping?.city),
        shipping_state: getValue(details?.shipping?.state),
        shipping_zip: getValue(details?.shipping?.zip),
        shipping_email: getValue(details?.shipping?.email),
        billing_full_name: getValue(details?.billing?.fullName),
        billing_address: getValue(details?.billing?.address),
        billing_address2: getValue(details?.billing?.address2),
        billing_city: getValue(details?.billing?.city),
        billing_state: getValue(details?.billing?.state),
        billing_zip: getValue(details?.billing?.zip),
        billing_phone: getValue(details?.billing?.phone),
        cart_summary: cartSummary,
        orderId: details?.orderId,
        totalPrice: getValue(details?.totalPrice, "0.00")
    };

    // Uncomment and use emailjs when ready to send email
    /*
    emailjs.send('service_7mcdie6', 'template_w4drjfj', emailData)
        .then(response => {
            showConfirmation(emailData);
        })
        .catch(error => {
            console.error("Failed to send purchase email:", error);
        });
    */

    showConfirmation(emailData);
}

function showConfirmation(data) {
    localStorage.clear();
    localStorage.setItem('purchaseConfirmed', 'true');

    const body = document.querySelector('body');
    body.style.transition = 'opacity 0.5s ease';
    body.style.opacity = 0;

    setTimeout(() => {
        window.location.href = "../HTML/index.html";
    }, 500);
}