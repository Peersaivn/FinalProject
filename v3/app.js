const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const loginForm = document.querySelector('.form-container.sign-in form');
const termsCheckbox = document.getElementById("termsCheckbox");
const body = document.body;

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    body.classList.add("slide-right");
});
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    body.classList.remove("slide-right");
});