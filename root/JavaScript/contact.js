function showForm(formId) {
    document.getElementById(formId).style.display = 'flex';
}

function closeForm(formId) {
    document.getElementById(formId).style.display = 'none';
}


document.addEventListener("DOMContentLoaded", (event) => {
	
	document.getElementById('signupform').addEventListener("submit", async function(e) {
	  e.preventDefault();

	  const form = e.target;
	  const formData = new FormData(form);

	  try {
		const response = await fetch("https://sheetdb.io/api/v1/v32ylg7l2m9ml", {
		  method: "POST",
		  body: formData
		});

		if (!response.ok) throw new Error("Failed to submit");

		alert("✅ Booking request sent successfully!");
		form.reset();
		closeForm('booking');
	  } catch (error) {
		alert("❌ Error: Could not submit. Check your inputs and try again.");
	  }
	});
});