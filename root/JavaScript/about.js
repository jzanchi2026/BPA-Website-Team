// Updates final timeline box with current month and year
function loadDate() {
	
	const currentDate = new Date();

	const monthNames = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
	];
	const currentMonth = monthNames[currentDate.getMonth()];
	const currentYear = currentDate.getFullYear();

	document.getElementById("specialDate").innerText = `${currentMonth} ${currentYear} – The Future is Bright`;
}


// Shows user the proper page information
function redirectTo(sectionId) {
	// Get all sections (except header and footer) on the page
	const sections = document.querySelectorAll('#aboutuss > div'); // Selects all divs inside #aboutuss
	
	// Loop through each section and hide it
	sections.forEach((section) => {
		if (section.id === sectionId) {
			section.style.display = 'block'; // Show the selected section
		} else {
			section.style.display = 'none'; // Hide the other sections
		}
	});
}