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
