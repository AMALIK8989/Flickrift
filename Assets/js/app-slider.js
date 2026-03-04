document.addEventListener("DOMContentLoaded", function () {

    // 1. Data
    const movies = [
        {
          id: 1,
          title: "Arrow",
          description: "A billionaire returns forged by hell and becomes Star City's shadow. Armed with a bow and unwavering determination, he wages a one-man war on crime.",
          genres: ["Action", "Drama", "Superhero"],
          rating: "8.1",
          badge: "Trending",
          watchUrl: "./Tv-Shows/Arrow.html",
          trailerUrl: "https://youtube.com",
          poster: "https://m.media-amazon.com/images/M/MV5BNjRlNjNlY2YtYzQxNS00ZTUzLTkwMTQtMjM0YjZlOWQwZmFkXkEyXkFqcGc@._V1_.jpg",
          bgImage: "https://m.media-amazon.com/images/S/pv-target-images/a26e14f253dc348a9e087c2e2830c3fad310e6a7f03de1021b055108fe635ec8.jpg"
        },
        {
          id: 2,
          title: "Atomic Blonde",
          description: "MI6 agent Lorraine Broughton dives into Cold-War Berlin where betrayal is currency.",
          genres: ["Thriller", "Noir", "Crime"],
          rating: "8.7",
          badge: "Top Rated",
          watchUrl: "./Atomic-Blonde.html",
          trailerUrl: "#",
          poster: "./Assets/Img/Atomic Blonde Info Image.webp",
          bgImage: "https://ntvb.tmsimg.com/assets/p12985371_v_h10_ak.jpg?w=1280&h=720"
        },
        {
          id: 3,
          title: "Blue Beetle",
          description: "An alien scarab chooses Jaime Reyes—and nothing stays normal again.",
          genres: ["Sci-Fi", "Action", "Fantasy"],
          rating: "7.9",
          badge: "New",
          watchUrl: "./Action/Blue-Beetle.html",
          trailerUrl: "#",
          poster: "./Assets/Img/Blue Beetle info-card.webp",
          bgImage: "https://m.media-amazon.com/images/S/pv-target-images/28a4c1eddb2ead5852f914fadcfe8dbe563fd11f216c0631ffe3fb92b03411b6.jpg"
        },
        {
          id: 4,
          title: "Mission Impossible",
          description: "Deep beneath the ocean, a submarine crew faces an impossible choice.",
          genres: ["War", "Thriller", "Drama"],
          rating: "8.4",
          badge: "Classic",
          watchUrl: "./Mission-Impossible-1.html",
          trailerUrl: "#",
          poster: "./Assets/Img/Mission Impossible 1.webp",
          bgImage: "https://thecosmiccircus.com/wp-content/uploads/2023/11/ethan-2.png"
        },
        {
          id: 5,
          title: "Oppenheimer",
          description: "The mind behind the bomb—and the weight of what it unleashed.",
          genres: ["Mystery", "Drama", "Psychological"],
          rating: "8.2",
          badge: "Must Watch",
          watchUrl: "#",
          trailerUrl: "#",
          poster: "./Assets/Img10/Oppenheimer-Info-Card.webp",
          bgImage: "https://cdn.theplaylist.net/wp-content/uploads/2023/05/08064650/Oppenheimer-Christopher-Nolan.jpg"
        }
    ];

    // 2. DOM Elements
    const bgContainer = document.getElementById('bg-container');
    const posterCarousel = document.getElementById('poster-carousel');
    const titleEl = document.getElementById('movieTitle');
    const descEl = document.getElementById('movieDesc');
    const tagsEl = document.getElementById('genreTags');
    const watchBtn = document.getElementById('watchBtn');
    const trailerBtn = document.getElementById('trailerBtn');
    const currentCounter = document.querySelector('.slide-counter .current');
    const totalCounter = document.querySelector('.slide-counter .total');
    const progressBar = document.getElementById('progressBar');
    
    let currentIndex = 0;
    let autoplayInterval;
    let progressInterval;
    const SLIDE_DURATION = 5000;

    // 3. Initialize
    function init() {
        totalCounter.textContent = String(movies.length).padStart(2, '0');
        
        // Generate HTML
        movies.forEach((movie, index) => {
            // Create Background
            const bgDiv = document.createElement('div');
            bgDiv.className = 'bg-slide';
            bgDiv.style.backgroundImage = `url('${movie.bgImage}')`;
            bgContainer.appendChild(bgDiv);

            // Create Poster Card
            const cardDiv = document.createElement('div');
            cardDiv.className = 'poster-card';
            cardDiv.innerHTML = `
                <span class="poster-badge">${movie.badge}</span>
                <img src="${movie.poster}" alt="${movie.title}">
                <div class="poster-rating">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    ${movie.rating}
                </div>
            `;
            posterCarousel.appendChild(cardDiv);
        });

        // Set initial state
        updateSlide(0);
        startAutoplay();
        setupSwipe(); // <--- INIT SWIPE
        
        // Button Event Listeners
        document.getElementById('prevBtn').addEventListener('click', () => goToSlide(currentIndex - 1));
        document.getElementById('nextBtn').addEventListener('click', () => goToSlide(currentIndex + 1));

        // Pause on hover
        const section = document.getElementById('slider-section');
        section.addEventListener('mouseenter', stopAutoplay);
        section.addEventListener('mouseleave', startAutoplay);
    }

    // 4. Update Logic
    function updateSlide(index) {
        const total = movies.length;
        const prevIndex = (index - 1 + total) % total;
        const nextIndex = (index + 1) % total;

        // Update Classes for Posters
        const cards = posterCarousel.querySelectorAll('.poster-card');
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev', 'next');
            if (i === index) card.classList.add('active');
            else if (i === prevIndex) card.classList.add('prev');
            else if (i === nextIndex) card.classList.add('next');
        });

        // Update Backgrounds
        const bgs = bgContainer.querySelectorAll('.bg-slide');
        bgs.forEach((bg, i) => bg.classList.toggle('active', i === index));

        // Update Text Content
        const movie = movies[index];
        const contentEls = document.querySelectorAll('.content-animate');
        contentEls.forEach(el => el.classList.remove('visible'));

        setTimeout(() => {
            titleEl.textContent = movie.title;
            descEl.textContent = movie.description;
            watchBtn.href = movie.watchUrl;
            trailerBtn.href = movie.trailerUrl;
            tagsEl.innerHTML = movie.genres.map(g => `<span class="genre-tag">${g}</span>`).join('');
            currentCounter.textContent = String(index + 1).padStart(2, '0');
            contentEls.forEach(el => el.classList.add('visible'));
        }, 200);
    }

    // 5. Navigation Logic
    function goToSlide(index) {
        stopAutoplay(); // Stop timer on manual interaction
        if (index < 0) index = movies.length - 1;
        if (index >= movies.length) index = 0;
        
        currentIndex = index;
        updateSlide(currentIndex);
        resetProgress();
        startAutoplay(); // Restart timer
    }

    // 6. Autoplay Logic
    function startAutoplay() {
        clearInterval(autoplayInterval); // Clear existing
        clearInterval(progressInterval);
        
        let progress = 0;
        progressBar.style.width = '0%';
        const step = 50; 
        const increment = (step / SLIDE_DURATION) * 100;
        
        progressInterval = setInterval(() => {
            progress += increment;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + '%';
        }, step);

        autoplayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, SLIDE_DURATION);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
        clearInterval(progressInterval);
    }
    
    function resetProgress() {
        // Just visual reset, logic handled by startAutoplay
        progressBar.style.width = '0%';
    }

    // 7. SWIPE FUNCTION (New)
    function setupSwipe() {
        const carousel = document.getElementById('poster-carousel');
        let startX = 0;
        let isDragging = false;

        // --- Touch Events (Mobile) ---
        carousel.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.changedTouches[0].clientX;
            handleSwipe(startX, endX);
        }, { passive: true });

        // --- Mouse Events (Desktop Drag) ---
        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            // Prevent dragging images/links accidentally
            e.preventDefault(); 
        });

        window.addEventListener('mousemove', (e) => {
            // Optional: Add visual dragging logic here if needed
            if (!isDragging) return;
            // e.clientX gives current position
        });

        window.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.clientX;
            handleSwipe(startX, endX);
        });
        
        // Prevent Clicking Links if it was a drag
        carousel.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        }, true);
    }

    function handleSwipe(startX, endX) {
        const threshold = 50; // Minimum pixels to trigger swipe
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swiped Left -> Next
                goToSlide(currentIndex + 1);
            } else {
                // Swiped Right -> Prev
                goToSlide(currentIndex - 1);
            }
        }
    }

    // Start
    init();
});
