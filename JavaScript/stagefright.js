// cool but find a way to make it so it only happens closer to the middle of pic
document.addEventListener('DOMContentLoaded', () => {
    let gg = document.getElementById("bgg");
    let cursorRing = document.querySelector('.cursor-ring');
	
    if (gg) {
        gg.addEventListener('mouseenter', () => {
            cursorRing.style.opacity = 0.2;
        });

        gg.addEventListener('mouseleave', () => {
            cursorRing.style.opacity = 0;
        });

        gg.addEventListener('mousemove', (event) => {
            const { clientX, clientY } = event;
            cursorRing.style.left = `${clientX - 50}px`;
            cursorRing.style.top = `${clientY - 50}px`;
        });
    }
});