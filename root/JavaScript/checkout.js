function renderCartSummary() {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];

	const cartItemsContainer = document.getElementById('cartItemsContainer');
	const totalPriceElement = document.getElementById('totalPrice');

	if (cart.length === 0) {
		cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
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
		itemName.textContent = order.name;
		itemDetails.appendChild(itemName);

		// Add the item size
		const itemSize = document.createElement('p');
		itemSize.textContent = `Size: ${order.size}`;
		itemDetails.appendChild(itemSize);

		// Add the item price
		const itemPrice = document.createElement('p');
		order.price = order.price.replace("$", "");
		itemPrice.textContent = `Price: $${parseFloat(order.price).toFixed(2)}`;
		itemDetails.appendChild(itemPrice);

		// Add the item quantity
		const itemQuantity = document.createElement('p');
		itemQuantity.textContent = `Quantity: ${order.quantity}`;
		itemDetails.appendChild(itemQuantity);

		// Calculate and add the total for this item
		const itemTotal = document.createElement('p');
		const itemTotalPrice = parseFloat(order.price) * order.quantity;
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

    // Validate form fields
    function validateFields(section) {
        const inputs = section.querySelectorAll("input");
        for (let input of inputs) {
            if (!input.value.trim()) {
                alert(`Please fill out the ${input.previousElementSibling.textContent} field.`);
                input.focus();
                return false;
            }
        }
        return true;
    }

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
});