function renderCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const totalPriceElement = document.getElementById('totalPrice');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p style='font-family:arial narrow;margin:15px;font-size:13pt'>YOUR CART IS EMPTY</p>";
        totalPriceElement.textContent = '0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';

    let total = 0;

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
        itemImage.src = order.image;
        itemImage.alt = order.name;
        cartItem.appendChild(itemImage);

        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');

        const itemName = document.createElement('p');
        itemName.classList.add('cart-item-name');
        itemName.textContent = order.name;
        itemDetails.appendChild(itemName);

        const itemSize = document.createElement('p');
        itemSize.classList.add('cart-item-size');
        itemSize.textContent = `Size: ${order.size}`;
        itemDetails.appendChild(itemSize);

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

        total += itemTotalPrice;
    });

    totalPriceElement.textContent = total.toFixed(2);
}

window.addEventListener("load", (event) => {
    renderCartSummary();
});

function validateFields(section) {
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const shippingSection = document.getElementById("shippingSection");
    const billingSection = document.getElementById("billingSection");
    const toggleToBilling = document.getElementById("toggleToBilling");
    const toggleToShipping = document.getElementById("toggleToShipping");
    const sameAsShipping = document.getElementById("sameAsShipping");
    const purchaseButton = document.getElementById("checkout-btn");

    sameAsShipping.addEventListener("change", () => {
        if (sameAsShipping.checked) {
            const shippingFirstName = document.querySelector("#shippingSection input[placeholder='Enter your first name']");
            const shippingLastName = document.querySelector("#shippingSection input[placeholder='Enter your last name']");
            const shippingAddress = document.querySelector("#shippingSection input[placeholder='Enter your address']");
            const shippingAddress2 = document.querySelector("#shippingSection input[placeholder='Enter your apartment, suite, etc.']");
            const shippingCity = document.querySelector("#shippingSection input[placeholder='Enter your city']");
            const shippingState = document.querySelector("#shippingSection input[placeholder='Enter your state']");
            const shippingZip = document.querySelector("#shippingSection input[placeholder='Enter your zip code']");
            const shippingEmail = document.querySelector("#shippingSection input[placeholder='Enter your email']");

            if (shippingFirstName && shippingLastName && shippingAddress && shippingAddress2 && shippingCity && shippingState && shippingZip && shippingEmail) {
                document.getElementById("billingFullName").value = shippingFirstName.value + ' ' + shippingLastName.value;
                document.getElementById("billingAddress").value = shippingAddress.value;
                document.getElementById("billingAddress2").value = shippingAddress2.value;
                document.getElementById("billingCity").value = shippingCity.value;
                document.getElementById("billingState").value = shippingState.value;
                document.getElementById("billingZip").value = shippingZip.value;
            }
        } else {
            document.getElementById("billingFullName").value = '';
            document.getElementById("billingAddress").value = '';
            document.getElementById("billingAddress2").value = '';
            document.getElementById("billingCity").value = '';
            document.getElementById("billingState").value = '';
            document.getElementById("billingZip").value = '';
        }
    });

    // Toggle to Billing Info
    toggleToBilling.addEventListener("click", () => {
        if (validateFields(shippingSection)) {
            shippingSection.style.display = "none";
            billingSection.style.display = "block";
        }else {
			console.log("BAD");
		}
    });

    // Toggle to Shipping Info
    toggleToShipping.addEventListener("click", () => {
        if (validateFields(billingSection)) {
            billingSection.style.display = "none";
            shippingSection.style.display = "block";
        }
    });

});

function passData() {
	const shippingDetails = {
		firstName: document.querySelector("#shippingSection input[placeholder='Enter your first name']").value,
		lastName: document.querySelector("#shippingSection input[placeholder='Enter your last name']").value,
		address: document.querySelector("#shippingSection input[placeholder='Enter your address']").value,
		address2: document.querySelector("#shippingSection input[placeholder='Enter your apartment, suite, etc.']").value,
		country: document.querySelector("#shippingSection input[placeholder='Enter your country']").value,
		city: document.querySelector("#shippingSection input[placeholder='Enter your city']").value,
		state: document.querySelector("#shippingSection input[placeholder='Enter your state']").value,
		zip: document.querySelector("#shippingSection input[placeholder='Enter your zip code']").value,
		email: document.querySelector("#shippingSection input[placeholder='Enter your email']").value
	};

	const billingDetails = {
		fullName: document.getElementById("billingFullName").value,
		address: document.getElementById("billingAddress").value,
		address2: document.getElementById("billingAddress2").value,
		country: document.getElementById("billingCountry").value,
		city: document.getElementById("billingCity").value,
		state: document.getElementById("billingState").value,
		zip: document.getElementById("billingZip").value,
		phone: document.getElementById("billingPhone").value,
		cardNumber: document.getElementById("billingCardNumber").value,
		expiration: document.getElementById("billingExpiration").value,
		cvv: document.getElementById("billingCVV").value
	};

	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	let totalPrice = 0;
	cart.forEach(item => {
		const itemPrice = parseFloat(item.price.replace('$', '')) * item.quantity;
		totalPrice += itemPrice;
	});

	const purchaseDetails = {
		shipping: shippingDetails,
		billing: billingDetails,
		cart: cart,
		totalPrice: totalPrice.toFixed(2)
	};

	if (validateFields(shippingSection) && validateFields(billingSection)) {
		sendPurchaseEmail(purchaseDetails);
	} else {
		alert("Please correct the errors before proceeding.");
	}
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
        totalPrice: getValue(details?.totalPrice, "0.00")
    };

    // Commented out emailjs send due to limited sends
    // emailjs.send('service_7mcdie6', 'template_w4drjfj', emailData)
    //     .then(response => {
    //         showConfirmation(emailData);
    //     })
    //     .catch(error => {
    //         console.error("Failed to send purchase email:", error);
    //     }); 

    // Console log emailData instead of sending the email
    console.log("Email data:", emailData);
	showConfirmation(emailData);
}

function showConfirmation(data) {
	console.log("Purchase email sent successfully!");
	const container = document.getElementById("container");
	container.innerHTML = "";
	const thanks = document.createElement('h2');
	thanks.textContent = `Thank you for your purchase! A confirmation email has been sent to ${data.shipping_email}.`;
	thanks.style.fontFamily = "radlushmed";
	thanks.style.color = "white";
	document.getElementById("container").appendChild(thanks);
}

