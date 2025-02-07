function showSection(id) {
  document.querySelectorAll('.tab-section').forEach(section => {
    section.style.display = section.id === id ? 'block' : 'none';
  });

  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });

  document.querySelector(`.tab-button[onclick="showSection('${id}')"]`).classList.add('active');
}
