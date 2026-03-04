document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".myHeroSwiper", {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        effect: "slide",
        speed: 800,

        // Responsive breakpoints
        breakpoints: {
            0: {           // Mobile
                slidesPerView: 1,
                spaceBetween: 10,
            },
            576: {         // Small devices
                slidesPerView: 1.5,
                spaceBetween: 15,
            },
            768: {         // Medium devices
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {         // Large devices
                slidesPerView: 2.5,
                spaceBetween: 25,
            },
            1200: {        // Extra large devices
                slidesPerView: 1,
                spaceBetween: 30,
            },
        },
    });

  AOS.init({
    once: false
});
});