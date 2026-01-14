const container = document.querySelector('.container');
const loginTab = document.querySelector('.login-tab');
const signupTab = document.querySelector('.signup-tab');
const loginBtn = document.querySelector('#loginBtn');
const signupBtn = document.querySelector('#signupBtn');

loginTab.addEventListener('click', () => {
  container.classList.add('show-login');
  container.classList.remove('show-signup');
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  document.body.classList.add('show-login');
  document.body.classList.remove('show-signup');
});

signupTab.addEventListener('click', () => {
  container.classList.add('show-signup');
  container.classList.remove('show-login');
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  document.body.classList.add('show-signup');
  document.body.classList.remove('show-login');
});

window.addEventListener('DOMContentLoaded', () => {
  container.classList.add('show-login');
  container.classList.remove('show-signup');
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  document.body.classList.add('show-login');
  document.body.classList.remove('show-signup');
});


