const openFormBtn = document.getElementById("openFormBtn");
const formModal = document.getElementById("formModal");
const closeFormBtn = document.getElementById("closeFormBtn");
const sections = document.querySelectorAll("section");

//Open modal
openFormBtn.addEventListener("click", () => {
  formModal.style.display = "block";
});
//Close modal
closeFormBtn.addEventListener("click", () => {
  formModal.style.display = "none";
});
//Close modal if user clicks outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === formModal) {
    formModal.style.display = "none";
  }
});

// Rendering animation: sections slide in on scroll or when clicked via nav links/buttons
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.3
});
//Observe each section so it renders
sections.forEach(section => observer.observe(section));
//Smooth scroll for nav links and Explore Services button
document.querySelectorAll('.nav-links a, .btn[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    targetSection.classList.add('visible');
  });
});
