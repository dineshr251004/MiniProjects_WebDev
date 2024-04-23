const doctors = [
    { id: 1, name: 'Dr. Achuth', slots: 3, bookedSlots: [] },
    { id: 2, name: 'Dr. Lakshman', slots: 3, bookedSlots: [] },
    { id: 3, name: 'Dr. Praveen', slots: 3, bookedSlots: [] },
  ];
  
  const bookings = [];
  
  function populateDoctorDropdown() {
    const doctorDropdown = document.getElementById('dp');
    doctors.forEach((doctor) => {
      const option = document.createElement('option');
      option.value = doctor.id;
      option.text = doctor.name;
      doctorDropdown.add(option);
    });
  }
  
  function displayAvailableSlots() {
    const doctorId = document.getElementById('dp').value;
    const doctor = doctors.find((d) => d.id === parseInt(doctorId));
    const slotContainer = document.getElementById('slot-container');
    slotContainer.innerHTML = '';
  
    for (let i = 1; i <= doctor.slots; i++) {
      const slot = document.createElement('div');
      slot.className = `slot ${doctor.bookedSlots.includes(i) ? 'booked' : ''}`;
      slot.textContent = `Slot ${i}`;
      slot.dataset.slotNumber = i;
      slot.addEventListener('click', () => bookAppointment(doctorId, i));
      slotContainer.appendChild(slot);
    }
  
    updateAppointmentSummary();
  }
  
  function bookAppointment(doctorId, slotNumber) {
    const patient = getPatientDetails();
    if (patient) {
      const doctor = doctors.find((d) => d.id === doctorId);
      if (!doctor.bookedSlots.includes(slotNumber)) {
        doctor.bookedSlots.push(slotNumber);
        bookings.push({ doctorId, slotNumber, patient });
        updateAppointmentSummary();
        updateAvailableSlots();
        alert(`Appointment booked for ${patient.name}.`);
      } else {
        alert('This slot is already booked. Please select another slot.');
      }
    }
  }
  
  function getPatientDetails() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const numInput = document.getElementById('num');
  
    if (nameInput.value && emailInput.value && numInput.value) {
      return {
        name: nameInput.value,
        email: emailInput.value,
        num: parseFloat(feeInput.value),
      };
    }
  
    alert('Please fill in all the required fields.');
    return null;
  }
  
  function updateAppointmentSummary() {
    const summaryContainer = document.getElementById('summary-container');
    summaryContainer.innerHTML = '';
  
    if (bookings.length === 0) {
      const noSummaryMessage = document.createElement('div');
      noSummaryMessage.textContent = 'No appointments booked yet.';
      noSummaryMessage.classList.add('summary-item');
      summaryContainer.appendChild(noSummaryMessage);
    } else {
      bookings.forEach((booking) => {
        const doctor = doctors.find((d) => d.id === booking.doctorId);
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.textContent = `Doctor: ${doctor.name}, Slot: ${booking.slotNumber}, Patient: ${booking.patient.name}, Fee: $${booking.patient.fee.toFixed(2)}`;
        summaryContainer.appendChild(summaryItem);
      });
    }
  }
  
  function updateAvailableSlots() {
    const doctorId = document.getElementById('dp').value;
    const doctor = doctors.find((d) => d.id === parseInt(doctorId));
    const slotContainer = document.getElementById('slot-container');
    const slots = slotContainer.getElementsByClassName('slot');
  
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const slotNumber = parseInt(slot.dataset.slotNumber);
      if (doctor.bookedSlots.includes(slotNumber)) {
        slot.classList.add('booked');
        slot.style.cursor = 'not-allowed';
      } else {
        slot.classList.remove('booked');
        slot.style.cursor = 'pointer';
      }
    }
  }

  populateDoctorDropdown();
  document.getElementById('dp').addEventListener('change', displayAvailableSlots);
  document.getElementById('registration-form').addEventListener('submit', (event) => {
    event.preventDefault();
    bookAppointment(document.getElementById('dp').value, null);
  });

