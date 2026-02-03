const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const loginForm = document.querySelector('.form-container.sign-in form');
const termsCheckbox = document.getElementById("termsCheckbox");
const body = document.body;
const termsTrigger = document.getElementById('openTerms');
const privacyTrigger = document.getElementById('openPrivacy');
const termsOverlay = document.getElementById('termsOverlay');
const privacyOverlay = document.getElementById('privacyOverlay');
const closeTerms = document.getElementById('closeTerms');
const closePrivacy = document.getElementById('closePrivacy');
const insideTerms = document.getElementById('insideTerms');
const insidePrivacy = document.getElementById('insidePrivacy');
const outsideTerms = document.getElementById('outsideTerms');
const outsidePrivacy = document.getElementById('outsidePrivacy');

//login and register slide animation
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    body.classList.add("slide-right");
});
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    body.classList.remove("slide-right");
});
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'dashboard.html';
});
//checkboxes for terms and privacy
openTerms.addEventListener('click', () => {
    termsOverlay.classList.add('active');
});
closeTerms.addEventListener('click', () => {
    termsOverlay.classList.remove('active');
});
insideTerms.addEventListener('change', () => {
    outsideTerms.checked = insideTerms.checked;
});
openPrivacy.addEventListener('click', () => {
    privacyOverlay.classList.add('active');
});
closePrivacy.addEventListener('click', () => {
    privacyOverlay.classList.remove('active');
});
insidePrivacy.addEventListener('change', () => {
    outsidePrivacy.checked = insidePrivacy.checked;
});