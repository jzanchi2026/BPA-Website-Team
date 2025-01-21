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

function getAge(person, elementId) {
	const birthdays = {
		blaze: new Date(1998, 7, 6),
		raquel: new Date(2002, 11, 22),
		dylan: new Date(2001, 3, 13)
	};

	if (!birthdays[person]) {
		console.error(`No birthday found for ${person}`);
		return;
	}

	const today = new Date();
	const birthDate = birthdays[person];
	let age = today.getFullYear() - birthDate.getFullYear();

	const hasHadBirthdayThisYear =
		today.getMonth() > birthDate.getMonth() ||
		(today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

	if (!hasHadBirthdayThisYear) {
		age--;
	}
	
	const targetElement = document.getElementById(elementId);
	targetElement.innerText = "AGE " + age;
}

window.addEventListener("load", (event) => {
	getAge('blaze', 'blaze-age');
	getAge('raquel', 'raquel-age');
	getAge('dylan', 'dylan-age');
});