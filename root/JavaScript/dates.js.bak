let events = [];
const sectionTakenSeatsMap = {};

// Fetches tour date info from JSON file
fetch('../JavaScript/tourInfo.json')
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return response.json();
	})
	.then(jsonDates => {
		if (Array.isArray(jsonDates) && jsonDates.length > 0) {
			events = jsonDates;
			loadTourData(jsonDates);
		} else {
			console.error('Tour data is empty or invalid:', jsonDates);
		}
	})

// Renders tour data on the page using JSON file
function loadTourData(tourData) {
	const tourContainer = document.getElementById('mainText');
	tourContainer.innerHTML = '';

	tourData.forEach(tour => {
		if (!tour) return;

		const tourDiv = document.createElement('div');
		tourDiv.className = 'tourdate';
		tourDiv.id = tour.id;

		const dateEl = document.createElement('h1');
		dateEl.textContent = tour.date;

		const locationDiv = document.createElement('div');
		locationDiv.className = 'location';
		locationDiv.innerHTML = `
			<h2>${tour.city}</h2>
			<h3>${tour.venue}</h3>
			<h3>${tour.address}</h3>
		`;

		const buttonDiv = document.createElement('div');
		buttonDiv.className = 'buttons';

		const ticketButton = document.createElement('button');
		ticketButton.type = 'button';
		ticketButton.role = 'link';
		ticketButton.textContent = 'Buy Tickets';
		ticketButton.onclick = () => showInfo(tour.spot);

		buttonDiv.appendChild(ticketButton);

		tourDiv.appendChild(dateEl);
		tourDiv.appendChild(locationDiv);
		tourDiv.appendChild(buttonDiv);

		tourContainer.appendChild(tourDiv);
	});
}

let selectedEvent = null;

function showInfo(spot) {
    const info = document.getElementById("extraInfo");
    const event = events.find(e => e.spot === spot);
    if (event) {
        selectedEvent = event;
        info.innerHTML = `
			<h1>EVENT INFORMATION</h1>
            <h2>${event.city}</h2>
            <h2>${event.date}</h2>
            <p class="extrainfotxt"><strong>Venue:</strong> ${event.venue}</p>
            <p class="extrainfotxt"><strong>Address:</strong> ${event.address}</p>
            <p class="extrainfotxt"><strong>Time:</strong> ${event.time || "TBA"}</p>
            <p class="extrainfotxt"><strong>Lineup:</strong> ${event.lineup?.join(', ') || "N/A"}</p>
            <p class="tourblurbs">${event.blurb || ""}</p>
        `;
        buildStadium();

        const sectionA = document.querySelector(".sectionseating");
        if (sectionA) {
            sectionA.classList.add("selectedSection");
            sectionInfo(sectionA);
        }

        info.style.display = "block";
        document.body.style.overflow = "hidden";

    } else {
        info.innerHTML = '<p>Information not available for this location.</p>';
    }
}



// Builds the potential stadium
function buildStadium() {
	const container = document.getElementById("stadiumContainer");
	container.innerHTML = '';

	// Top piece header
	const topPiece = document.createElement('div');
	topPiece.classList.add('topPiece');
	topPiece.innerHTML = '<h1>VENUE SEAT SELECTION</h1>';
	container.appendChild(topPiece);

	// Main stadium structure
	const stadium = document.createElement('div');
	stadium.id = 'stadium';
	stadium.classList.add('stadium');
	container.appendChild(stadium);

	const stageLeft = document.createElement('div');
	stageLeft.classList.add('stageSides');

	const stageCenter = document.createElement('div');
	stageCenter.classList.add('stageCenter');

	const stage = document.createElement('div');
	stage.classList.add('stage');
	stage.innerHTML = "STAGE";
	stageCenter.appendChild(stage);

	const stageRight = document.createElement('div');
	stageRight.classList.add('stageSides');

	const vipFloor = document.createElement('div');
	vipFloor.classList.add('vipFloor');
	stageCenter.appendChild(vipFloor);

	const vipsection = document.createElement('div');
	vipsection.classList.add('vipsection');
	vipsection.innerHTML = "VIP";
	vipsection.onclick = () => sectionInfo(vipsection);
	vipFloor.appendChild(vipsection);

	const bottomFloor = document.createElement('div');
	bottomFloor.classList.add('bottomFloor');
	stageCenter.appendChild(bottomFloor);

	const topFloor = document.createElement('div');
	topFloor.classList.add('topFloor');
	stageCenter.appendChild(topFloor);

	for (let i = 0; i < 10; i++) {
		const section = document.createElement('div');
		section.classList.add('sectionseating');
		section.innerHTML = String.fromCharCode(i + 65);
		section.onclick = () => {
			selectedEvent.section = section.innerHTML;
			sectionInfo(section);
		}

		if (i < 5) {
			stageLeft.appendChild(section);
		} else {
			stageRight.appendChild(section);
		}
	}

	for (let i = 10; i < 16; i++) {
		const section = document.createElement('div');
		section.classList.add('longseating');
		section.innerHTML = String.fromCharCode(i + 65);
		section.onclick = () => sectionInfo(section);

		if (i < 13) {
			bottomFloor.appendChild(section);
		} else {
			topFloor.appendChild(section);
		}
	}

	stadium.appendChild(stageLeft);
	stadium.appendChild(stageCenter);
	stadium.appendChild(stageRight);

	document.getElementById("ticketingInfo").style.display = "block";
}


// Closes the div when activated
function closeTicketing() {
	document.getElementById("ticketingInfo").style.display = "none";
	document.body.style.overflowY = "auto";
	document.body.style.overflowX = "hidden";
}

function setPrice(sectionLetter, quantity) {
    const priceContainer = document.getElementById('seatPricing');
    let pricePerSeat = 0;

    // Assign price per seat based on section
    if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].includes(sectionLetter)) {
        pricePerSeat = "$100.00"; // Sections A-J
    } else if (['K', 'L', 'M', 'N', 'O', 'P'].includes(sectionLetter)) {
        pricePerSeat = "$150.00"; // Sections K-P
    } else if (sectionLetter === 'VIP') {
        pricePerSeat = "$300.00"; // VIP section
    }

    // Calculate total price
    const totalPrice = parseFloat(pricePerSeat.replace("$", "")) * quantity;

    // Display total price
    priceContainer.innerHTML = `<p>PRICE: $${totalPrice}</p>`;
	selectedEvent.price = pricePerSeat;
}

function sectionInfo(passed) {
	
    const sectionDisplay = document.getElementById("sectionDisplay");
    sectionDisplay.innerHTML = '';

    // Deselect any previously selected section and highlight the clicked one
    const selectedSections = document.querySelectorAll(".selectedSection");
    selectedSections.forEach(section => section.classList.remove("selectedSection"));
    passed.classList.add("selectedSection");

    const sectionLetter = passed.innerHTML;
    let seatCount = 0;
	
	if (sectionLetter === 'VIP') {
		document.getElementById("sectionName").innerHTML = "VIP Section:";
	}
	else {
		document.getElementById("sectionName").innerHTML = "Section " + sectionLetter + ":";
	}
    // Determine seat count based on section
    if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].includes(sectionLetter)) {
        seatCount = 99;
    } else if (['K', 'L', 'M', 'N', 'O', 'P'].includes(sectionLetter)) {
        seatCount = 209;
    } else if (sectionLetter === 'VIP') {
        seatCount = 44;
    }

    // Update price for the selected section and quantity
    setPrice(sectionLetter, quantity);

    if (!sectionTakenSeatsMap[sectionLetter]) {
        const takenSeats = new Set();
        while (takenSeats.size < Math.floor(seatCount * 0.2)) {
            takenSeats.add(Math.floor(Math.random() * seatCount));
        }
        sectionTakenSeatsMap[sectionLetter] = takenSeats;
    }

    const takenSeats = sectionTakenSeatsMap[sectionLetter];

    // Create seats and assign availability
    for (let j = 0; j < seatCount; j++) {
        const seat = document.createElement("div");
        seat.classList.add("displaySeat");
        seat.dataset.index = j;

        if (takenSeats.has(j)) {
            seat.classList.add("takenSeat");
        } else {
            seat.classList.add("availableSeat");
        }

        sectionDisplay.appendChild(seat);
    }

    // Highlight seats based on quantity
    highlightSeats(quantity);
}



function highlightSeats(quantity) {
    const availableSeats = Array.from(document.querySelectorAll(".availableSeat"));
    availableSeats.forEach(seat => seat.classList.remove("selectedSeat"));

    let start = findContiguousSeats(availableSeats, quantity);
    if (start !== -1) {
        for (let i = start; i < start + quantity; i++) {
            availableSeats[i].classList.add("selectedSeat");
        }
    }
}


function findContiguousSeats(seatList, quantity, seatsPerRow) {
    const middleIndex = Math.floor(seatList.length / 2);
    const seatPriority = seatList.map((seat, i) => ({
        index: i,
        distance: Math.abs(i - middleIndex),
    }));

    seatPriority.sort((a, b) => a.distance - b.distance);

    // Try finding contiguous seats from sorted seat indices
    for (let { index: i } of seatPriority) {
        // Skip if there aren't enough remaining seats in the same row
        const row = Math.floor(i / seatsPerRow); // Determine the row of the seat
        const lastIndexInRow = (row + 1) * seatsPerRow - 1; // Last index of the row

        // Ensure the seats are within the same row and have enough seats in a block
        if (i + quantity - 1 > lastIndexInRow || i + quantity - 1 >= seatList.length) {
            continue;
        }

        let contiguous = true;
        for (let j = 0; j < quantity; j++) {
            // Check if seats are consecutive in the list and available
            if (parseInt(seatList[i + j].dataset.index) !== parseInt(seatList[i].dataset.index) + j) {
                contiguous = false;
                break;
            }
            if (seatList[i + j].classList.contains("takenSeat")) {
                contiguous = false; // Skip if any seat in the block is already taken
                break;
            }
        }

        if (contiguous) {
            return i; // Return the starting index of contiguous seats
        }
    }

    return -1; // No valid block found
}



let quantity = 1;

document.addEventListener("DOMContentLoaded", () => {
    const sectionA = document.querySelector(".sectionseating");
    const sectionAElement = document.querySelector(".sectionseating");

    if (sectionAElement) {
        sectionAElement.classList.add("selectedSection");
        sectionInfo(sectionAElement);
    }

    const decrementButton = document.getElementById('decrementButton');
    const incrementButton = document.getElementById('incrementButton');
    const quantityDisplay = document.getElementById('quantityDisplay');

    decrementButton.addEventListener('click', () => {
        if (quantity > 1) {
            quantity -= 1;
            quantityDisplay.textContent = quantity;
			
            highlightSeats(quantity);

            const selectedSection = document.querySelector(".selectedSection");
            setPrice(selectedSection.innerHTML, quantity);
        }
    });

    incrementButton.addEventListener('click', () => {
        if (quantity < 8) {
            quantity += 1;
            quantityDisplay.textContent = quantity;
            highlightSeats(quantity);
            const selectedSection = document.querySelector(".selectedSection");
            setPrice(selectedSection.innerHTML, quantity);
        }
    });
	
    if (document.querySelector(".sectionseating")) {
        highlightSeats(quantity);
    }
	
	document.getElementById("addToCart").addEventListener("click", () => {
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
			addTicketToCart(selectedEvent, selectedEvent.price, quantity, selectedSection.innerHTML);
		}
	});
	
	const storedEvent = localStorage.getItem("event");
	console.log(storedEvent);
    if (storedEvent) {
		const event = JSON.parse(storedEvent);
		const interval = setInterval(() => {
			if (events.length > 0) {
				showInfo(event.spot);
				localStorage.removeItem("event");
				clearInterval(interval);
			}
		}, 100);
	}


});


