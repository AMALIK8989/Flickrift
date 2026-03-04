document.addEventListener('DOMContentLoaded', () => {
    
    // Check if Swiper is loaded
    if (typeof Swiper === 'undefined') {
        console.error('Swiper is not loaded');
        return;
    }

    const actionSwiper = new Swiper('.actionSwiper', {
        // Responsive breakpoints
        slidesPerView: 2, // Default for smallest screens
        spaceBetween: 10,
        loop: true,
        
        breakpoints: {
            // Tablet
            576: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            // Small Desktop
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // Large Desktop
            1024: {
                slidesPerView: 4,
                spaceBetween: 25
            },
            // Extra Large
            1400: {
                slidesPerView: 5,
                spaceBetween: 25
            }
        },

        // Navigation
        navigation: {
            nextEl: '.swiper-next-action',
            prevEl: '.swiper-prev-action',
        },
    });

    // Initialize Romance Swiper
const romanceSwiper = new Swiper('.romanceSwiper', {
     slidesPerView: 2, // Default for smallest screens
        spaceBetween: 10,
         loop: true,
        
        breakpoints: {
            // Tablet
            576: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            // Small Desktop
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // Large Desktop
            1024: {
                slidesPerView: 4,
                spaceBetween: 25
            },
            // Extra Large
            1400: {
                slidesPerView: 5,
                spaceBetween: 25
            }
        },

        // Navigation
        navigation: {
            nextEl: '.swiper-next-action',
            prevEl: '.swiper-prev-action',
        },
         grabCursor: true,
    freeMode: { enabled: true, sticky: false },
});

const thrillerSwiper = new Swiper('.thrillerSwiper', {
   slidesPerView: 2, // Default for smallest screens
        spaceBetween: 10,
         loop: true,
        
        breakpoints: {
            // Tablet
            576: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            // Small Desktop
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // Large Desktop
            1024: {
                slidesPerView: 4,
                spaceBetween: 25
            },
            // Extra Large
            1400: {
                slidesPerView: 5,
                spaceBetween: 25
            }
        },

        // Navigation
        navigation: {
            nextEl: '.swiper-next-action',
            prevEl: '.swiper-prev-action',
        },
         grabCursor: true,
    freeMode: { enabled: true, sticky: false },
});

// --- Adventure Slider ---
const adventureSwiper = new Swiper('.adventureSwiper', {
    loop: true, // INFINITE LOOP
    slidesPerView: 2,
    spaceBetween: 10,
   breakpoints: {
            // Tablet
            576: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            // Small Desktop
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // Large Desktop
            1024: {
                slidesPerView: 4,
                spaceBetween: 25
            },
            // Extra Large
            1400: {
                slidesPerView: 5,
                spaceBetween: 25
            }
        },

        // Navigation
        navigation: {
            nextEl: '.swiper-next-action',
            prevEl: '.swiper-prev-action',
        },
    grabCursor: true,
    freeMode: { enabled: true, sticky: false },
});

// --- Horror Slider ---
const horrorSwiper = new Swiper('.horrorSwiper', {
    loop: true, // INFINITE LOOP
    slidesPerView: 2,
    spaceBetween: 10,
   breakpoints: {
            // Tablet
            576: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            // Small Desktop
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // Large Desktop
            1024: {
                slidesPerView: 4,
                spaceBetween: 25
            },
            // Extra Large
            1400: {
                slidesPerView: 5,
                spaceBetween: 25
            }
        },

        // Navigation
        navigation: {
            nextEl: '.swiper-next-action',
            prevEl: '.swiper-prev-action',
        },
    grabCursor: true,
    freeMode: { enabled: true, sticky: false },
});

// --- Indie Slider ---
const indieSwiper = new Swiper('.indieSwiper', {
      loop: true, // INFINITE LOOP
    slidesPerView: 2,
    spaceBetween: 10,
   breakpoints: {
            // Tablet
            576: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            // Small Desktop
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // Large Desktop
            1024: {
                slidesPerView: 4,
                spaceBetween: 25
            },
            // Extra Large
            1400: {
                slidesPerView: 5,
                spaceBetween: 25
            }
        },

        // Navigation
        navigation: {
            nextEl: '.swiper-next-action',
            prevEl: '.swiper-prev-action',
        },
    grabCursor: true,
    freeMode: { enabled: true, sticky: false },
});

// --- TV Shows Slider ---
const tvShowsSwiper = new Swiper('.tvShowsSwiper', {
   loop: true, // INFINITE LOOP
    slidesPerView: 2,
    spaceBetween: 10,
   breakpoints: {
            // Tablet
            576: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            // Small Desktop
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // Large Desktop
            1024: {
                slidesPerView: 4,
                spaceBetween: 25
            },
            // Extra Large
            1400: {
                slidesPerView: 5,
                spaceBetween: 25
            }
        },

        // Navigation
        navigation: {
            nextEl: '.swiper-next-action',
            prevEl: '.swiper-prev-action',
        },
    grabCursor: true,
    freeMode: { enabled: true, sticky: false },
});

// --- Animated Slider ---
const animatedSwiper = new Swiper('.animatedSwiper', {
    loop: true, // INFINITE LOOP
    slidesPerView: 2,
    spaceBetween: 10,
   breakpoints: {
            // Tablet
            576: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            // Small Desktop
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // Large Desktop
            1024: {
                slidesPerView: 4,
                spaceBetween: 25
            },
            // Extra Large
            1400: {
                slidesPerView: 5,
                spaceBetween: 25
            }
        },

        // Navigation
        navigation: {
            nextEl: '.swiper-next-action',
            prevEl: '.swiper-prev-action',
        },
    grabCursor: true,
    freeMode: { enabled: true, sticky: false },
});

});

