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

	// Loop through each item in the cart and display it
	cart.forEach((order) => {
		// Create the cart item element
		const cartItem = document.createElement('div');
		cartItem.classList.add('cart-item');
		
		// Create the removal button
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');

        // Add event listener to remove item on click
        removeButton.addEventListener('click', () => {
			// Find the index of the current item in the cart
			const index = cart.findIndex(item => item === order);

			// If the item is found, remove it from the cart
			if (index > -1) {
				cart.splice(index, 1);
				localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
				renderCartSummary(); // Re-render the cart
			}
		});
		cartItem.appendChild(removeButton);

		// Add the item image
		const itemImage = document.createElement('img');
		itemImage.src = order.image;
		itemImage.alt = order.name;
		cartItem.appendChild(itemImage);

		// Create the item details container
		const itemDetails = document.createElement('div');
		itemDetails.classList.add('item-details');

		// Add the item name
		const itemName = document.createElement('p');
		itemName.classList.add('cart-item-name');
		itemName.textContent = order.name;
		itemDetails.appendChild(itemName);

		// Add the item size
		const itemSize = document.createElement('p');
		itemSize.classList.add('cart-item-size');
		itemSize.textContent = `Size: ${order.size}`;
		itemDetails.appendChild(itemSize);
		// Add the item quantity
		const itemQuantity = document.createElement('p');
		itemQuantity.classList.add('cart-item-quantity');
		itemQuantity.textContent = `Qty: ${order.quantity}`;
		itemDetails.appendChild(itemQuantity);

		// Calculate and add the total for this item
		const itemTotal = document.createElement('p');
		let newtot = order.price.replace("$", "");
		const itemTotalPrice = parseFloat(newtot) * order.quantity;
		itemTotal.classList.add('cart-item-price');
		itemTotal.textContent = `Total: $${itemTotalPrice.toFixed(2)}`;
		itemDetails.appendChild(itemTotal);

		// Append item details to the cart item
		cartItem.appendChild(itemDetails);

		// Append the cart item to the cart container
		cartItemsContainer.appendChild(cartItem);

		// Add the item's total to the overall total
		total += itemTotalPrice;
	});

	// Update the total price in the summary
	totalPriceElement.textContent = total.toFixed(2);
}

window.addEventListener("load", (event) => {
	renderCartSummary();
});

document.addEventListener("DOMContentLoaded", () => {
    const shippingSection = document.getElementById("shippingSection");
    const billingSection = document.getElementById("billingSection");
    const toggleToBilling = document.getElementById("toggleToBilling");
    const toggleToShipping = document.getElementById("toggleToShipping");
    const sameAsShipping = document.getElementById("sameAsShipping");
    const purchaseButton = document.getElementById("checkout-btn"); // assuming you have a purchase button

    // Validate form fields
    function validateFields(section) {
        
        return true;
    }

    // Handle checkbox to copy shipping address to billing address
    sameAsShipping.addEventListener("change", () => {
        if (sameAsShipping.checked) {
            // Make sure the shipping fields exist before copying
            const shippingFirstName = document.querySelector("#shippingSection input[placeholder='Enter your first name']");
            const shippingLastName = document.querySelector("#shippingSection input[placeholder='Enter your last name']");
            const shippingAddress = document.querySelector("#shippingSection input[placeholder='Enter your address']");
            const shippingAddress2 = document.querySelector("#shippingSection input[placeholder='Enter your apartment, suite, etc.']");
            const shippingCity = document.querySelector("#shippingSection input[placeholder='Enter your city']");
            const shippingState = document.querySelector("#shippingSection input[placeholder='Enter your state']");
            const shippingZip = document.querySelector("#shippingSection input[placeholder='Enter your zip code']");
            const shippingEmail = document.querySelector("#shippingSection input[placeholder='Enter your email']");

            if (shippingFirstName && shippingLastName && shippingAddress && shippingAddress2 && shippingCity && shippingState && shippingZip && shippingEmail) {
                // Copy shipping address to billing address
                document.getElementById("billingFullName").value = shippingFirstName.value + ' ' + shippingLastName.value;
                document.getElementById("billingAddress").value = shippingAddress.value;
                document.getElementById("billingAddress2").value = shippingAddress2.value;
                document.getElementById("billingCity").value = shippingCity.value;
                document.getElementById("billingState").value = shippingState.value;
                document.getElementById("billingZip").value = shippingZip.value;
                document.getElementById("billingPhone").value = shippingEmail.value;  // Using email as phone number for simplicity
            }
        } else {
            // Clear billing info if unchecked
            document.getElementById("billingFullName").value = '';
            document.getElementById("billingAddress").value = '';
            document.getElementById("billingAddress2").value = '';
            document.getElementById("billingCity").value = '';
            document.getElementById("billingState").value = '';
            document.getElementById("billingZip").value = '';
            document.getElementById("billingPhone").value = '';
        }
    });

    // Toggle to Billing Info
    toggleToBilling.addEventListener("click", () => {
        if (validateFields(shippingSection)) {
            shippingSection.style.display = "none";
            billingSection.style.display = "block";
        }
    });

    // Toggle to Shipping Info
    toggleToShipping.addEventListener("click", () => {
        if (validateFields(billingSection)) {
            billingSection.style.display = "none";
            shippingSection.style.display = "block";
        }
    });

    // Handle purchase button click
    purchaseButton.addEventListener("click", () => {
        // Gather form data
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

        // Send purchase details to email (simulated)
        sendPurchaseEmail(purchaseDetails);
    });

    function sendPurchaseEmail(details) {
		const emailBody = `
		Shipping Details:
		Name: ${details.shipping.firstName} ${details.shipping.lastName}
		Address: ${details.shipping.address}, ${details.shipping.address2}, ${details.shipping.city}, ${details.shipping.state} ${details.shipping.zip}
		Email: ${details.shipping.email}

		Billing Details:
		Full Name: ${details.billing.fullName}
		Address: ${details.billing.address}, ${details.billing.address2}, ${details.billing.city}, ${details.billing.state} ${details.billing.zip}
		Phone: ${details.billing.phone}
		Card Number: ${details.billing.cardNumber}
		Expiration: ${details.billing.expiration}

		Cart Items:
		${details.cart.map(item => `Name: ${item.name}, Quantity: ${item.quantity}, Price: $${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}`).join('\n')}

		Total Price: $${details.totalPrice}
		`;

		Email.send({
			SecureToken: "your_secure_token", // Replace with the secure token you will get from SMTP.js
			To: "jessicaz202020@gmail.com", // Recipient email address
			From: details.shipping.email, // Sender email address (this can be the customer's email)
			Subject: "Purchase Details",
			Body: emailBody
		}).then((message) => {
			if (message === "OK") {
				alert("Purchase details sent successfully!");
			} else {
				alert("Failed to send purchase details.");
			}
		}).catch((error) => {
			alert("Error sending email: " + error);
		});
	}

});
