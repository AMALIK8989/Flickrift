// Navbar Scroll Effect
document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.getElementById('mainNav');

    if (mainNav) {
        // Check scroll position on load
        if (window.scrollY > 50) {
            mainNav.classList.add('navbar-scrolled');
        }

        // Add listener for scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainNav.classList.add('navbar-scrolled');
            } else {
                mainNav.classList.remove('navbar-scrolled');
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".nav-item.dropdown");

    dropdowns.forEach(dropdown => {
        let timeout;

        const menu = dropdown.querySelector(".dropdown-menu");

        dropdown.addEventListener("mouseenter", () => {
            clearTimeout(timeout);
            menu.style.display = "block";
        });

        dropdown.addEventListener("mouseleave", () => {
            timeout = setTimeout(() => {
                menu.style.display = "none";
            }, 180); // delay before closing (adjust 150–300ms to taste)
        });
    });
});