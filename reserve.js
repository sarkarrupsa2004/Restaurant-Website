// Update name fields dynamically based on the number of adults and children
document.getElementById('adults').addEventListener('input', updateNameFields);
document.getElementById('children').addEventListener('input', updateNameFields);

function updateNameFields() {
  const namesSection = document.getElementById('namesSection');
  namesSection.innerHTML = ''; // Clear existing fields

  const numAdults = parseInt(document.getElementById('adults').value) || 0;
  const numChildren = parseInt(document.getElementById('children').value) || 0;

  // Add fields for adults
  for (let i = 1; i <= numAdults; i++) {
    const label = document.createElement('label');
    label.textContent = `Adult ${i} Name:`;
    const input = document.createElement('input');
    input.type = 'text';
    input.name = `adult${i}`;
    input.placeholder = `Enter name of adult ${i}`;
    input.required = true;

    namesSection.appendChild(label);
    namesSection.appendChild(input);
  }

  // Add fields for children
  for (let i = 1; i <= numChildren; i++) {
    const label = document.createElement('label');
    label.textContent = `Child ${i} Name:`;
    const input = document.createElement('input');
    input.type = 'text';
    input.name = `child${i}`;
    input.placeholder = `Enter name of child ${i}`;
    input.required = true;

    namesSection.appendChild(label);
    namesSection.appendChild(input);
  }
}

// Validate and handle the booking
document.getElementById('bookButton').addEventListener('click', () => {
  const form = document.getElementById('reservationForm');
  const formData = new FormData(form);

  const numAdults = parseInt(document.getElementById('adults').value) || 0;
  const numChildren = parseInt(document.getElementById('children').value) || 0;
  const totalPeople = numAdults + numChildren;

  const names = [];
  let allNamesFilled = true;

  formData.forEach((value, key) => {
    if (key.startsWith('adult') || key.startsWith('child')) {
      names.push(value.trim());
      if (value.trim() === '') {
        allNamesFilled = false; // Mark as false if any name field is empty
      }
    }
  });

  // Check for mismatch in number of names and people
  if (names.length !== totalPeople) {
    alert('Error: Mismatch in the number of names and people entered.');
    return;
  }

  // Check if all name fields are filled
  if (!allNamesFilled) {
    alert('Please fill in all names before booking.');
    return;
  }

  // If everything is valid, show success message
  alert(`Booking successful!\nAdults: ${numAdults}\nChildren: ${numChildren}\nNames: ${names.join(', ')}`);
});
