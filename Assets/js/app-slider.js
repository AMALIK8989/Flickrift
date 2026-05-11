document.addEventListener("DOMContentLoaded", function () {

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
 
// ─── BUILD DOM ───
document.getElementById('totNum').textContent = String(movies.length).padStart(2, '0');
 
// Background slides
const bgWrapper = document.getElementById('bgWrapper');
bgWrapper.innerHTML = movies.map(m =>
  `<div class="swiper-slide" style="background-image:url('${m.bgImage}')"></div>`
).join('');
 
// Poster slides
const posterWrapper = document.getElementById('posterWrapper');
posterWrapper.innerHTML = movies.map(m => `
  <div class="swiper-slide">
    <span class="poster-badge">${m.badge}</span>
    <img src="${m.poster}" alt="${m.title}" loading="lazy">
    <div class="poster-rating">
      <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      ${m.rating}
    </div>
  </div>
`).join('');
 
// ─── SWIPER INIT ───
let bgSwiper, posterSwiper;
let progInterval, progVal = 0;
const DURATION = 5000;
const STEP = 60;
 
bgSwiper = new Swiper('#bg-swiper', {
  loop: true,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  speed: 900,
  allowTouchMove: false
});
 
posterSwiper = new Swiper('#poster-swiper', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 3,
  spaceBetween: 18,
  speed: 700,
  grabCursor: true,
  breakpoints: {
    0:   { slidesPerView: 2, spaceBetween: 12 },
    600: { slidesPerView: 3, spaceBetween: 18 }
  },
  on: {
    slideChangeTransitionStart: function () {
      const ri = posterSwiper.realIndex;
      bgSwiper.slideToLoop(ri, 900);
      updateText(ri);
      startProgress();
    }
  }
});
 
// ─── TEXT UPDATE ───
function updateText(idx) {
  const animEls = document.querySelectorAll('.ca');
  animEls.forEach(el => el.classList.remove('vis'));
 
  setTimeout(() => {
    const m = movies[idx];
    document.getElementById('movieTitle').textContent  = m.title;
    document.getElementById('movieDesc').textContent   = m.description;
    document.getElementById('watchBtn').href           = m.watchUrl;
    document.getElementById('trailerBtn').href         = m.trailerUrl;
    document.getElementById('genreTags').innerHTML     = m.genres.map(g =>
      `<span class="genre-tag">${g}</span>`).join('');
    document.getElementById('curNum').textContent      = String(idx + 1).padStart(2, '0');
    animEls.forEach(el => el.classList.add('vis'));
  }, 200);
}
 
// ─── PROGRESS BAR ───
function startProgress() {
  clearInterval(progInterval);
  progVal = 0;
  document.getElementById('progressBar').style.width = '0%';
  const inc = (STEP / DURATION) * 100;
  progInterval = setInterval(() => {
    progVal = Math.min(progVal + inc, 100);
    document.getElementById('progressBar').style.width = progVal + '%';
    if (progVal >= 100) clearInterval(progInterval);
  }, STEP);
}
 
// ─── AUTOPLAY ───
function startAutoplay() {
  posterSwiper.autoplay.start();
  bgSwiper.autoplay.start();
  startProgress();
}
function stopAutoplay() {
  posterSwiper.autoplay.stop();
  bgSwiper.autoplay.stop();
  clearInterval(progInterval);
}
 
// Re-configure autoplay after init
posterSwiper.params.autoplay = { delay: DURATION, disableOnInteraction: false };
posterSwiper.autoplay.start();
 
// ─── NAV BUTTONS ───
document.getElementById('prevBtn').addEventListener('click', () => {
  posterSwiper.slidePrev();
  bgSwiper.slidePrev();
  startProgress();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  posterSwiper.slideNext();
  bgSwiper.slideNext();
  startProgress();
});
 
// ─── HOVER PAUSE ───
const section = document.getElementById('slider-section');
section.addEventListener('mouseenter', stopAutoplay);
section.addEventListener('mouseleave', startAutoplay);
 
// ─── INIT ───
updateText(0);
startProgress();
});
