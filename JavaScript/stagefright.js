document.addEventListener('DOMContentLoaded', () => {
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
});

window.addEventListener('DOMContentLoaded', () => {
    const scrollY = window.scrollY; // Get current scroll position
    const h3 = document.getElementById('scrollingText');
    const h32 = document.getElementById('otherscrolling');

    // Initialize position based on scroll position
    h3.style.transform = `translateX(${-scrollY}px)`;
    h32.style.transform = `translateX(${scrollY}px)`;
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const h3 = document.getElementById('scrollingText');
    const h32 = document.getElementById('otherscrolling');

    // Update position dynamically on scroll
    h3.style.transform = `translateX(${-scrollY}px)`;
    h32.style.transform = `translateX(${scrollY}px)`;
});