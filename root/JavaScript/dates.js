let events = [];

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

// Renders tour data on the page
function loadTourData(tourData) {
	const tourContainer = document.getElementById('text');
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

// Builds the extra info for each tour date
function showInfo(spot) {
	const info = document.getElementById("extraInfo");

	const event = events.find(e => e.spot === spot);
	if (event) {
		info.innerHTML = `
		<h2>${event.city}</h2>
		<h2>${event.date}</h2>
		<p><strong>Venue:</strong> ${event.venue}</p>
		<p><strong>Address:</strong> ${event.address}</p>
		<p><strong>Time:</strong> ${event.time || "TBA"}</p>
		<p><strong>Lineup:</strong> ${event.lineup?.join(', ') || "N/A"}</p>
		<p class="tourblurbs">${event.blurb || ""}</p>
		`;
		buildStadium();
	} else {
		info.innerHTML = '<p>Information not available for this location.</p>';
	}
}

// Builds the potential stadium
function buildStadium() {
	const stadium = document.getElementById("stadium");

	stadium.innerHTML = '';

	const topPiece = document.createElement('div');
	topPiece.classList.add('topPiece');

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
}

document.addEventListener("DOMContentLoaded", (event) => {
	
	let quantity = 1;
	const decrementButton = document.getElementById('decrementButton');
	const incrementButton = document.getElementById('incrementButton');
	const quantityDisplay = document.getElementById('quantityDisplay');

	decrementButton.addEventListener('click', () => {
		if (quantity > 1) {
			quantity -= 1;
			quantityDisplay.textContent = quantity;
		}
	});

	incrementButton.addEventListener('click', () => {
		quantity += 1;
		quantityDisplay.textContent = quantity;
	});
});

