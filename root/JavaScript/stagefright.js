// fades the page in and out on load
window.addEventListener('load', function() {
    const body = document.querySelector('body');
    body.style.opacity = 1;
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

let boxHidden = true;
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
}

// dynamically positions the text on bgg, hides pullup
window.addEventListener('DOMContentLoaded', () => {
    const scrollY = window.scrollY; 
    const h3 = document.getElementById('scrollingText');
    const h32 = document.getElementById('otherscrolling');
	
	var section = document.getElementById("pullup");
    section.classList.add("hidden");
	if (h3 != null)
		h3.style.transform = `translateX(${-scrollY}px)`;
	if (h32 != null)
    h32.style.transform = `translateX(${scrollY}px)`;
});

// dynamically scrolls the text on bgg
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const h3 = document.getElementById('scrollingText');
    const h32 = document.getElementById('otherscrolling');
	if (h3 != null)
		h3.style.transform = `translateX(${-scrollY}px)`;
	if (h32 != null)
    h32.style.transform = `translateX(${scrollY}px)`;
});

// pulls up the navbar onhover
let isOpen = false;
function pullup() {
    const footer = document.getElementById("pullup");
    if (!isOpen) {
        footer.classList.add("visible");
        isOpen = true;
    } else {
        footer.classList.remove("visible");
        isOpen = false;
    }
}

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
    selected.style.display = "flex"; // Make the selected div visible
    selected.style.opacity = "0"; // Start the new div with opacity 0 for fade-in
    setTimeout(() => {
        selected.style.opacity = "1"; // Fade in the new div
    }, 50); // Small delay for smoother transition
    shownDiv = selected; // Update the currently shown div
}

