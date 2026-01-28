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
// Open Clothes Selection Popup
function openClothesSelectionPopup() {
  document.getElementById('clothes-selection-popup').style.display = "flex";
}
// Close Clothes Selection Popup
function closeClothesSelectionPopup() {
  document.getElementById('clothes-selection-popup').style.display = "none";
}
// Confirm clothing + fabric selection and add to basket
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
// Quantity controls
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
// Delete clothing item
function deleteClothesItem(btn) {
  btn.parentElement.remove();
}
// Go to Transaction Popup
function goToTransaction() {
  document.getElementById('clothes-popup').style.display = "none";
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
// Close Transaction Popup
function closeTransactionPopup() {
    document.getElementById('transaction-popup').style.display = "none";
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
