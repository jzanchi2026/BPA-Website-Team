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
				buildDates(events);
			} else {
				console.error('Tour data is empty or invalid:', jsonDates);
			}
		})
		
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
        element.style.opacity = Math.max(1 - scrollY / (window.innerHeight * 0.3), 0);
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


// Builds the HTML and CSS for the featured shop as well as the interactive aspect of it
function buildFeatured(jsonProducts) {
	const contentContainers = document.querySelectorAll(".shopsnap");
	const choices = ["APPAREL", "MEDIA", "ALBUMS", "CLEARANCE", "POSTERS", "COLLECTIBLES", "VINYLS", "LIMITED"];

	const featuredProducts = [jsonProducts[0], jsonProducts[10], jsonProducts[2], jsonProducts[5], jsonProducts[1], jsonProducts[15], jsonProducts[6], jsonProducts[13]];

	featuredProducts.forEach((product, index) => {
		let cc = choices[index];
		let productCard = document.createElement("div");
		productCard.classList.add("home-product-card");
		let imageUrl = Array.isArray(product.image) ? product.image[0] : product.image;
		productCard.style.backgroundImage = `url(${imageUrl})`;

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
				sizeOptions.style.transform = "translateX(100%)";
				sizeOptions.style.opacity = "0";
				icon1.style.transform = "scale(1)";
			}
		});
    });

    sizeOptions.addEventListener("mouseleave", () => {
		isHoveringSizeOptions = false;
		if (!icon1.matches(":hover")) {
			sizeOptions.style.transform = "translateX(100%)";
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
		const body = document.querySelector("body");
		body.style.transition = "opacity 0.5s ease";
		body.style.opacity = 0;
		setTimeout(() => {
			window.location.href = "shop.html";
		}, 500);
    });

    iconBar.appendChild(icon1);
    iconBar.appendChild(icon2);
    productCard.appendChild(iconBar);

		const containerIndex = index < 4 ? 0 : 1;
		contentContainers[containerIndex].appendChild(productCard);
	});
}

function buildDates(events) {
    const eventsContainer = document.getElementById('toursnaparea');

    const upcomingEvents = events
        .map(event => ({
            ...event,
            parsedDate: new Date(`${new Date().getFullYear()}/${event.date}`)
        }))
        .filter(event => event.parsedDate >= new Date())
        .sort((a, b) => a.parsedDate - b.parsedDate);

    const eventsToDisplay = upcomingEvents.length > 0 
        ? upcomingEvents.slice(0, 4) 
        : getRandomEvents(events, 4);

    eventsToDisplay.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        const eventLocation = document.createElement('h3');
        eventLocation.classList.add('event-location');
        eventLocation.innerHTML = `${event.city}<br>${event.venue}`;

        const eventDateTime = document.createElement('p');
        eventDateTime.classList.add('event-date-time');
        eventDateTime.innerHTML = `Date: ${event.date}<br>Time: ${event.time}`;

        const eventAddress = document.createElement('p');
        eventAddress.classList.add('event-address');
        eventAddress.textContent = `Address: ${event.address}`;
        
        const eventButton = document.createElement('button');
        eventButton.classList.add('event-tour-button');
        eventButton.textContent = `See Details`;

        eventCard.appendChild(eventLocation);
        eventCard.appendChild(eventDateTime);
        eventCard.appendChild(eventAddress);
        eventCard.appendChild(eventButton);
        eventButton.addEventListener("click", () => {
            localStorage.setItem("event", JSON.stringify(event));
            const body = document.querySelector('body');
            body.style.transition = 'opacity 0.5s ease';
            body.style.opacity = 0;

            setTimeout(() => {
                window.location.href = "dates.html";
            }, 500);
        });

        eventsContainer.appendChild(eventCard);
    });
	
	const leftArrow = document.createElement('button');
		leftArrow.classList.add('scroll-arrow', 'left-arrow');
		leftArrow.innerHTML = '<';
		leftArrow.addEventListener('click', () => {
			eventsContainer.scrollBy({ left: -300, behavior: 'smooth' });
		});

	eventsContainer.parentElement.appendChild(leftArrow);

   
    const rightArrow = document.createElement('button');
    rightArrow.classList.add('scroll-arrow', 'right-arrow');
    rightArrow.innerHTML = '>';
    rightArrow.addEventListener('click', () => {
        eventsContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });

    eventsContainer.parentElement.appendChild(rightArrow);
}


function getRandomEvents(events, num) {
	const shuffledEvents = events.sort(() => 0.5 - Math.random());
	return shuffledEvents.slice(0, num);
}

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayers = document.querySelectorAll(".audio-player");
    let currentlyPlaying = null;

    audioPlayers.forEach(player => {
        const audio = player.querySelector(".audio-file");
        const playPauseBtn = player.querySelector(".play-pause");
        const progressBar = player.querySelector(".progress");
        const timestamp = player.querySelector(".timestamp");

        playPauseBtn.addEventListener("click", function () {
            if (audio.paused) {
                if (currentlyPlaying && currentlyPlaying !== audio) {
                    currentlyPlaying.pause();
                    currentlyPlaying.currentTime = 0;
                    currentlyPlaying.closest(".albumcontainer").querySelector(".play-pause").textContent = "▶";
                }

                audio.play();
                playPauseBtn.textContent = "⏸";
                currentlyPlaying = audio;
            } else {
                audio.pause();
                playPauseBtn.textContent = "▶";
                currentlyPlaying = null;
            }
        });

        audio.addEventListener("timeupdate", function () {
            const currentTime = audio.currentTime;
            const duration = audio.duration || 1;
            progressBar.value = (currentTime / duration) * 100;
            timestamp.textContent = formatTime(currentTime);
        });

        progressBar.addEventListener("input", function () {
            const duration = audio.duration || 1;
            audio.currentTime = (progressBar.value / 100) * duration;
        });

        audio.addEventListener("ended", function () {
            playPauseBtn.textContent = "▶";
            currentlyPlaying = null;
        });
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }
});


