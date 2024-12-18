// fades the page in and out on load
window.addEventListener('load', function() {
    const body = document.querySelector('body');
    body.style.opacity = 1;
});

function fadeout(event) {
    event.preventDefault();
    const body = document.querySelector('body');
    body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = event.target.href;
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

// gives a ring of color to the cursor in bgg
/*document.addEventListener('DOMContentLoaded', () => {
    let gg = document.getElementById("bgg");
    let cursorRing = document.querySelector('.cursor-ring');
	
    if (gg) {
        gg.addEventListener('mouseenter', () => {
            cursorRing.style.opacity = 0.8;
        });

        gg.addEventListener('mouseleave', () => {
            cursorRing.style.opacity = 0;
        });

        gg.addEventListener('mousemove', (event) => {
			const rect = gg.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			const radius = rect.width / 4;

			const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
			if (distance < radius) {
				cursorRing.style.opacity = 0.3;
				cursorRing.style.left = `${event.clientX - 50}px`;
				cursorRing.style.top = `${event.clientY - 50}px`;
			} else {
				cursorRing.style.opacity = 0;
			}
		});
    }
});*/

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

document.querySelectorAll('.profile-item').forEach((item) => {
    const img = item.querySelector('img');
    const blurb = item.querySelector('.infoblrb');

    img.addEventListener('mouseenter', () => {
        item.classList.add('active');
    });

    img.addEventListener('mouseleave', (event) => {
        // Check if mouse is still over the blurb
        if (!blurb.matches(':hover')) {
            item.classList.remove('active');
        }
    });

    blurb.addEventListener('mouseleave', () => {
        // Remove active class only when both image and blurb lose hover
        if (!img.matches(':hover')) {
            item.classList.remove('active');
        }
    });
});