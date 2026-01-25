const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const menuToggler = document.querySelector(".menu-toggler");

const collapsedSidebarHeight = "56px";
const fullSidebarHeight = "calc(100vh - 32px)";

const locationBox = document.querySelector('.location');
const selectedText = document.querySelector('.selected-text');
const options = document.querySelectorAll('ul li');


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
