const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const menuToggler = document.querySelector(".menu-toggler");

const collapsedSidebarHeight = "56px";
const fullSidebarHeight = "calc(100vh - 32px)";

const locationBox = document.querySelector('.location');
const selectedText = document.querySelector('.selected-text');
const options = document.querySelectorAll('.box.greetings ul li');

const billingPopup = document.getElementById('billing-popup');
const closePopup = document.getElementById('closePopup');
const popupOrderIdSpan = document.getElementById('popupOrderId');
const popupFirstStep = document.querySelector('.popup-firststep');
const popupStepInPerson = document.getElementById('popupStepInPerson');
const popupStepOnline = document.getElementById('popupStepOnline');
const popupNextBtn = document.getElementById('popupNextBtn');
//Calendar starts here
const date = new Date();
//Some calendar functions
function renderCalendar() {
  const monthDays = document.querySelector(".days");
  const monthElement = document.querySelector(".date");

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevLastDay = new Date(year, month, 0).getDate();

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  monthElement.innerHTML = `${months[month]} ${year}`;

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="day prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    const todayClass =
      i === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? "today"
        : "";
    days += `<div class="day ${todayClass}">${i}</div>`;
  }

  const totalCells = firstDayIndex + lastDay;
  const nextDays = 42 - totalCells;
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  monthDays.innerHTML = days;
}
//Making those cheverons work
const prevBtn = document.querySelector(".month .material-symbols-rounded:first-child");
const nextBtn = document.querySelector(".month .material-symbols-rounded:last-child");
//Click events for the prev and next btn in the calendar
prevBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});
nextBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});
//GO button function thingy
document.querySelector(".goto-btn").addEventListener("click", () => {
  const input = document.querySelector(".date-input").value.trim();
  const [mm, yyyy] = input.split("/");

  if (mm > 0 && mm <= 12 && yyyy.length === 4) {
    date.setMonth(parseInt(mm) - 1);
    date.setFullYear(parseInt(yyyy));
    renderCalendar();
  } else {
    alert("Enter date in mm/yyyy format (e.g. 02/2026)");
  }
});
//TODAY button thingy
document.querySelector(".today-btn").addEventListener("click", () => {
  const today = new Date();
  date.setMonth(today.getMonth());
  date.setFullYear(today.getFullYear());
  renderCalendar();
});
//Rendering Calendar
renderCalendar();
//Calendar Ends Here

//Toggles sidebar's collapsed state
sidebarToggler.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

//Update sidebar height and menu toggle text
const toggleMenu = (isMenuActive) =>{
    sidebar.style.height = isMenuActive ? `${sidebar.scrollHeight}px` : collapsedSidebarHeight;
    menuToggler.querySelector('span').innerText = isMenuActive ? "close" : "menu";
}
//Toggle menu-active class and adjust height
menuToggler.addEventListener('click', () =>{
    toggleMenu(sidebar.classList.toggle('menu-active'));
});
//Adjust sidebar height on window resize
window.addEventListener('resize', () => {
    if(window.innerWidth >= 1024){
        if(sidebar.classList.contains('collapsed')){
            sidebar.style.height = "85px";
        }else{
            sidebar.style.height = fullSidebarHeight;
        }
    }else{
        sidebar.classList.remove('collapsed');
        sidebar.style.height = "auto";
        toggleMenu(sidebar.classList.contains("menu-active"));
    }
});

// Navigation functionality for single-page dashboard
document.querySelectorAll('[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        // Show the selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
        // Update active link styling
        document.querySelectorAll('[data-section]').forEach(l => {
            l.classList.remove('active');
        });
        link.classList.add('active');
    });
});

// Set dashboard as active on page load
window.addEventListener('load', () => {
    const dashboardLink = document.querySelector('[data-section="dashboard"]');
    if (dashboardLink) {
        dashboardLink.classList.add('active');
    }
});

//Dropdown toggle for location selector
locationBox.addEventListener('click', () => {
    locationBox.classList.toggle('active');
});
//Dropdown option selection
options.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedText.textContent = option.innerText;
        locationBox.classList.remove('active');
    });
});

//History Popup
function openHistoryPopup() {
    document.getElementById('history-popup').style.display = "flex";
}
function closeHistoryPopup() {
    document.getElementById('history-popup').style.display = "none";
}
// Open Service Popup
function openServicePopup() {
  document.getElementById('service-popup').style.display = "flex";
}
// Close Service Popup
function closeServicePopup() {
  document.getElementById('service-popup').style.display = "none";
}
// Open Add Service Popup
function openAddServicePopup() {
  document.getElementById('add-service-popup').style.display = "flex";
}
// Close Add Service Popup
function closeAddServicePopup() {
  document.getElementById('add-service-popup').style.display = "none";
}
// Confirm service selection and add to active list
function confirmServiceSelection(serviceName) {
  const activeList = document.getElementById('active-services');
  const item = document.createElement('div');
  item.className = 'service-item';
  item.innerHTML = `
    <span>${serviceName}</span>
    <button class="remove-btn" onclick="removeService(this)">✖</button>
  `;
  activeList.appendChild(item);
  closeAddServicePopup();
}
// Remove service from active list
function removeService(btn) {
  btn.
  parentElement.remove();
}
// Close Add Service Popup
function closeAddServicePopup() {
  document.getElementById('add-service-popup').style.display = "none";
}

// Go to Clothes Popup
function goToClothesPopup() {
  closeServicePopup();
  document.getElementById('clothes-popup').style.display = "flex";
}
//Back Function
function backToServicePopup() {
  document.getElementById('clothes-popup').style.display = "none";
  document.getElementById('service-popup').style.display = "flex";
}
// Open Clothes Selection Popup
function openClothesSelectionPopup() {
  document.getElementById('clothes-selection-popup').style.display = "flex";
}
// Close Clothes Selection Popup
function closeClothesSelectionPopup() {
  document.getElementById('clothes-selection-popup').style.display = "none";
}
//Confirm clothing + fabric selection and add to basket
function confirmClothesSelection() {
  const clothing = document.getElementById('clothing-type').value;
  const fabric = document.getElementById('fabric-type').value;
  const list = document.getElementById('clothes-list');
  const item = document.createElement('div');
  item.className = 'clothes-item';
  item.innerHTML = `
    <span>${clothing} - ${fabric}</span>
    <span class="price">₱ Placeholder</span>
    <div class="quantity-control">
      <button onclick="decreaseQuantity(this)">-</button>
      <input type="number" value="1" min="0">
      <button onclick="increaseQuantity(this)">+</button>
    </div>
    <button class="delete-btn" onclick="deleteClothesItem(this)">Delete</button>
  `;
  list.appendChild(item);
  closeClothesSelectionPopup();
}
//Quantity controls
function increaseQuantity(btn) {
  const input = btn.parentElement.querySelector('input');
  input.value = parseInt(input.value) + 1;
}
function decreaseQuantity(btn) {
  const input = btn.parentElement.querySelector('input');
  if (parseInt(input.value) > 0) {
    input.value = parseInt(input.value) - 1;
  }
}
//Delete clothing item
function deleteClothesItem(btn) {
    btn.parentElement.remove();
}
// Go to Schedule Popup
function goToSchedulePopup() {
  document.getElementById('clothes-popup').style.display = 'none';
  document.getElementById('schedule-delivery-popup').style.display = 'flex';
}
// Global variable to store selected schedule
let selectedSchedule = null;
// Function to handle schedule selection
function selectSchedule(time) {
  // Save the selected time
  selectedSchedule = time;
  console.log("Schedule selected:", time);
  // Reset button styles
  const buttons = document.querySelectorAll('.schedule-options button');
  buttons.forEach(btn => btn.classList.remove('active'));
  // Highlight the clicked button
  const clickedBtn = Array.from(buttons).find(btn => btn.textContent === time);
  if (clickedBtn) {
    clickedBtn.classList.add('active');
  }
}
//Global variable to store selected delivery method
let selectedDelivery = null;
//Function to handle delivery selection
function selectDelivery(method) {
  //Save the selected method
  selectedDelivery = method;
  console.log("Delivery selected:", method);
  //Reset button styles
  const buttons = document.querySelectorAll('.delivery-options button');
  buttons.forEach(btn => btn.classList.remove('active'));
  //Highlight the clicked button
  const clickedBtn = Array.from(buttons).find(btn => btn.textContent === method);
  if (clickedBtn) {
    clickedBtn.classList.add('active');
  }
}
//Back Function
function backToClothesPopup() {
  document.getElementById('schedule-delivery-popup').style.display = "none";
  document.getElementById('clothes-popup').style.display = "flex";
}

//Go to Transaction Popup
function goToTransaction() {
  document.getElementById('schedule-delivery-popup').style.display = "none";
  document.getElementById('transaction-popup').style.display = "flex";
  // Fill transaction summary dynamically
  const summary = document.getElementById('transaction-summary');
  summary.innerHTML = "";
  // Services
  const services = document.querySelectorAll('#active-services .service-item span');
  if (services.length > 0) {
    summary.innerHTML += "<h4>Services:</h4><ul>";
    services.forEach(s => {
      summary.innerHTML += `<li>${s.textContent}</li>`;
    });
    summary.innerHTML += "</ul>";
  }
  // Clothes
  const clothes = document.querySelectorAll('#clothes-list .clothes-item');
  if (clothes.length > 0) {
    summary.innerHTML += "<h4>Clothes:</h4><ul>";
    clothes.forEach(c => {
      const name = c.querySelector('span').textContent;
      const qty = c.querySelector('input').value;
      summary.innerHTML += `<li>${name} (x${qty})</li>`;
    });
    summary.innerHTML += "</ul>";
  }
  // Detergent
  const detergent = document.getElementById('detergent-choice').value;
  summary.innerHTML += `<p><strong>Detergent:</strong> ${detergent}</p>`;
  // Instructions
  const instructions = document.getElementById('special-instructions').value;
  summary.innerHTML += `<p><strong>Instructions:</strong> ${instructions || "None"}</p>`;
  // Schedule
  if (selectedSchedule) {
    summary.innerHTML += `<p><strong>Schedule:</strong> ${selectedSchedule}</p>`;
  } else {
    summary.innerHTML += `<p><strong>Schedule:</strong> Not selected</p>`;
  }
  // Delivery Method
  if (selectedDelivery) {
    summary.innerHTML += `<p><strong>Delivery Method:</strong> ${selectedDelivery}</p>`;
  } else {
    summary.innerHTML += `<p><strong>Delivery Method:</strong> Not selected</p>`;
  }
}
function toggleTransactionType() {
  const type = document.querySelector('input[name="transaction-type"]:checked').value;
  const onlineSection = document.getElementById('online-payment-section');

  if (type === "Online") {
    onlineSection.style.display = "block";
  } else {
    onlineSection.style.display = "none";
  }
}
function confirmTransaction() {
  const type = document.querySelector('input[name="transaction-type"]:checked').value;
  if (type === "Online") {
    const fileInput = document.getElementById('payment-screenshot');
    if (fileInput.files.length === 0) {
      alert("Please upload a screenshot proof of payment.");
      return;
    }
    alert("Online transaction confirmed with GCash.");
  } else {
    alert("Onsite transaction confirmed.");
  }
  closeTransactionPopup();
}
//Close Transaction Popup
function closeTransactionPopup() {
    document.getElementById('transaction-popup').style.display = "none";
}
//Back Function
function backToSchedulePopup() {
  document.getElementById('transaction-popup').style.display = "none";
  document.getElementById('schedule-delivery-popup').style.display = "flex";
}
// Billing Part
function openBillingPopup(billId) {
    document.getElementById('bill-popup').style.display = "flex";
    document.getElementById('bill-title').innerText = billId + " Details";
    const details = document.getElementById('bill-details');
    details.innerHTML = `
        <p><strong>Bill ID:</strong> ${billId}</p>
        <p><strong>Date:</strong> Jan 28, 2026</p>
        <p><strong>Service:</strong> Laundry + Iron/Press</p>
        <p><strong>Total:</strong> ₱ 450</p>
        <p><strong>Status:</strong> ${
        billId === "BILL 0006" || billId === "BILL 0005" ? "On Review" :
        billId === "BILL 0004" ? "Pending" : "Completed"
        }</p>
    `;
}
function closeBillPopup() {
    document.getElementById('bill-popup').style.display = "none";
}

//Edit Popup
document.querySelectorAll(".edit-btn, .edit-location-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const field = btn.dataset.field;
    openEditPopup(field);
  });
});

//Open popup w custom inputs
function openEditPopup(field) {
  const popup = document.getElementById("edit-popup");
  const title = document.getElementById("popupTitle");
  const body = document.getElementById("popupBody");

  popup.classList.remove("hidden");
  
  switch(field) {
    case "fullname":
      title.textContent = "Edit Full Name";
      body.innerHTML = `
        <div class="popup-field">
          <label>Last Name:</label>
          <input type="text" id="editLastName" value="${document.getElementById("lastName").textContent}">
        </div>
        <div class="popup-field">
          <label>First Name:</label>
          <input type="text" id="editFirstName" value="${document.getElementById("firstName").textContent}">
        </div>
        <div class="popup-field">
          <label>Middle Name:</label>
          <input type="text" id="editMiddleName" value="${document.getElementById("middleName").textContent}">
        </div>
      `;
      break;

    case "gender":
      title.textContent = "Edit Gender";
      body.innerHTML = `
        <select id="editInput">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      `;
      break;

    case "birthday":
      title.textContent = "Edit Birthday";
      body.innerHTML = `
        <div class="birthday-fields">
          <div class="popup-field">
            <label>Month:</label>
            <input type="text" id="monthInput" value="${document.getElementById("birthMonth").textContent}" placeholder="MM">
          </div>
          <div class="popup-field">
            <label>Day:</label>
            <input type="text" id="dayInput" value="${document.getElementById("birthDay").textContent}" placeholder="DD">
          </div>
          <div class="popup-field">
            <label>Year:</label>
            <input type="text" id="yearInput" value="${document.getElementById("birthYear").textContent}" placeholder="YYYY">
          </div>
        </div>
      `;
      break;
    
    case "contact":
      title.textContent = "Edit Contact Information";
      body.innerHTML = `
        <div class="popup-field">
          <label>Phone No:</label>
          <input type="text" id="editTelephone" value="${document.getElementById("telephone").textContent}">
        </div>
        <div class="popup-field">
          <label>Email:</label>
          <input type="text" id="editEmail" value="${document.getElementById("email").textContent}">
        </div>
      `;
      break;
    case "location":
      title.textContent = "Edit Address";
      body.innerHTML = `
        <div id="map" style="width:100%; height:300px; border-radius:8px; margin-bottom:15px;"></div>
        <div class="popup-field">
          <label>Specific Address:</label>
          <input type="text" id="editLocationText" value="${document.getElementById("location").textContent}" placeholder="e.g. B14-24 L13-28, Tower 2">
        </div>
        <!-- Hidden fields to store lat/lng -->
        <input type="hidden" id="locationLat">
        <input type="hidden" id="locationLng">
      `;
      setTimeout(() => {
        const map = L.map('map').setView([14.65, 120.97], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        let marker = L.marker([14.65, 120.97], {draggable:true}).addTo(map);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            map.setView([lat, lng], 16);
            marker.setLatLng([lat, lng]);
            document.getElementById("locationLat").value = lat;
            document.getElementById("locationLng").value = lng;
          });
        }

        marker.on('dragend', function(e) {
          const pos = marker.getLatLng();
          document.getElementById("locationLat").value = pos.lat;
          document.getElementById("locationLng").value = pos.lng;
        });
      }, 0);
      break;

    default:
      title.textContent = "Edit " + field.charAt(0).toUpperCase() + field.slice(1);
      body.innerHTML = `<input type="text" id="editInput">`;
  }

  //Save
  document.getElementById("saveEdit").onclick = () => {
    if(field === "fullname") {
      document.getElementById("lastName").textContent = document.getElementById("editLastName").value;
      document.getElementById("firstName").textContent = document.getElementById("editFirstName").value;
      document.getElementById("middleName").textContent = document.getElementById("editMiddleName").value;
    } else if(field === "birthday") {
      document.getElementById("birthMonth").textContent = document.getElementById("monthInput").value;
      document.getElementById("birthDay").textContent = document.getElementById("dayInput").value;
      document.getElementById("birthYear").textContent = document.getElementById("yearInput").value;
    } else if(field === "contact") {
      document.getElementById("telephone").textContent = document.getElementById("editTelephone").value;
      document.getElementById("email").textContent = document.getElementById("editEmail").value;
    } else if(field === "location") {
      const newAddress = document.getElementById("editLocationText").value;
      const lat = document.getElementById("locationLat").value;
      const lng = document.getElementById("locationLng").value;

      document.getElementById("location").textContent = newAddress;

      console.log("Saved address:", newAddress);
      console.log("Saved coordinates:", lat, lng);
    } else {
      const newVal = document.getElementById("editInput").value;
      document.getElementById(field).textContent = newVal;
    }
    popup.classList.add("hidden");
  };

  //Cancel
  document.getElementById("cancelEdit").onclick = () => {
    popup.classList.add("hidden");
  };
}