document.addEventListener("DOMContentLoaded", () => {
  const assetsFolderName = "Assets";
  const footerLinksData = [
    { text: "Home", href: "index.html", class: "home-link" },
    { text: "App", href: "App.html", class: "app-link" },
    { text: "Privacy Policy", href: "privacy-policy.html", class: "policy-list" },
    { text: "Terms of Service", href: "terms-of-services.html", class: "terms-list" }
  ];

  console.log("%c🤖 Footer Bot 7000 Activated! 🚀", "font-size: 20px; font-weight: bold; color: #4CAF50; background: #E8F5E9; padding: 10px; border-radius: 5px; border: 2px solid #4CAF50;");

  function getPaths() {
    const path = window.location.pathname;
    const pathParts = path.split("/");
    const directoryDepth = pathParts.length - 2;
    const rootPath = directoryDepth > 0 ? "../".repeat(directoryDepth) : "./";
    const assetsPath = rootPath + assetsFolderName + "/";
    return { rootPath, assetsPath };
  }

  const { rootPath, assetsPath } = getPaths();
  console.log(`%c🧭 Calculated path to Root: ${rootPath}`, "color: #2196F3; font-weight: bold;");
  console.log(`%c🧭 Calculated path to Assets: ${assetsPath}`, "color: #2196F3; font-weight: bold;");

  const oldFooter = document.querySelector("footer");
  if (oldFooter) {
    oldFooter.style.display = "none";
    console.log("%c🙈 Old footer cloaked successfully.", "color: #388E3C; font-weight: bold;");
  } else {
    console.log("%cℹ️ No existing footer found to cloak.", "color: #FFA726; font-style: italic;");
  }

  const generatedLinksHtml = footerLinksData.map(link => {
    const fullHref = rootPath + link.href;
    console.log(`%c✅ Assembling Link: ${link.text} -> ${fullHref}`, "color: #388E3C; font-weight: bold;");
    return `<li><a class="${link.class}" href="${fullHref}">${link.text}</a></li>`;
  }).join("");

  const newFooterHtml = `
    <div class="container-fluid section" id="section-footer">
      <footer class="container">
        <div class="footer-main d-flex flex-wrap justify-content-between align-items-start">
          <div class="footer-left text-center text-md-start">
            <img src="${assetsPath}Logo.png" alt="Flickrift Logo" class="footer-logo-img mb-3">
            <p class="about-text mb-0">
              FlickRift empowers every viewer with unlimited access to HD entertainment —
              no barriers, no sign-ups, no compromise. Stream free, stay curious, dive deep.
            </p>
          </div>
          <div class="footer-right d-flex flex-column flex-md-row align-items-start mt-4 mt-md-0">
            <ul class="footer-links list-unstyled me-md-5 mb-3 mb-md-0 text-center text-md-start">
              ${generatedLinksHtml}
            </ul>
            <ul class="footer-social-links list-unstyled d-flex gap-3 justify-content-center justify-content-md-start">
              <li><a href="https://www.quora.com" target="_blank"><i class="fa-brands fa-quora"></i></a></li>
              <li><a href="https://bsky.app/profile/iflixx.bsky.social" target="_blank"><i class="fa-brands fa-twitter"></i></a></li>
              <li><a href="https://www.reddit.com" target="_blank"><i class="fa-brands fa-reddit"></i></a></li>
              <li><a href="https://www.facebook.com" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="https://www.instagram.com" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
              <li><a href="https://twitter.com" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></li>
              <li></li><a href="https://www.youtube.com/@gamerden3065" target="_blank"><i class="fa-brands fa-youtube"></i></a></li>

            </ul>
          </div>
        </div>
        <div class="footer-bottom text-center mt-4">
          <p class="mb-0 text-white-50">
            © All rights reserved by <strong>FlickRift</strong> |
            <span id="power">Powered by <a class="nex" href="https://nexonix.netlify.app/" target="_blank">Nexonix</a></span>
          </p>
        </div>
      </footer>
    </div>
  `;

  const main = document.querySelector("main");
  if (main) {
    const temp = document.createElement("div");
    temp.innerHTML = newFooterHtml;
    main.insertAdjacentElement("afterend", temp.firstElementChild);
    console.log("%c🎉 Mission Complete! New footer deployed.","font-size: 16px; font-weight: bold; color: #D32F2F; background: #FFEBEE; padding: 8px; border-radius: 5px;");
  } else {
    console.warn("⚠️ <main> tag not found. Footer not rendered.");
  }
});


document.addEventListener("DOMContentLoaded", () => {
    // Wait for FA stylesheet to fully apply
    const faCheck = setInterval(() => {
        // Test by checking if font is available
        if (document.fonts && document.fonts.check("1em 'Font Awesome 6 Free'")) {
            clearInterval(faCheck);
            if (window.FontAwesome && window.FontAwesome.dom) {
                window.FontAwesome.dom.i2svg();
                console.log("💫 Font Awesome icons re-rendered successfully");
            } else {
                console.warn("FA JS not detected — but CSS-only icons should work.");
            }
        }
    }, 100);
});

let swiperAssetsLoaded = false;
let swiperInitialized = false;

/* ===============================
   LOAD SWIPER ASSETS
================================ */
function loadSwiperAssets() {
  if (swiperAssetsLoaded) {
    console.log("ℹ️ Swiper assets already loaded");
    return Promise.resolve();
  }

  const cssUrl = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css";
  const jsUrl = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js";

  const cssPromise = new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${cssUrl}"]`)) return resolve();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssUrl;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });

  const jsPromise = new Promise((resolve, reject) => {
    if (typeof Swiper !== "undefined") return resolve();

    const script = document.createElement("script");
    script.src = jsUrl;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });

  return Promise.all([cssPromise, jsPromise])
    .then(() => {
      swiperAssetsLoaded = true;
      console.log("✅ Swiper assets loaded");
    })
    .catch(err => console.error("❌ Swiper load failed", err));
}

/* ===============================
   INIT HERO + THUMB SWIPERS
================================ */
async function initHeroSwiper() {
  if (swiperInitialized) return;

  await loadSwiperAssets();

  const mainEl = document.querySelector(".mainSwiper");
  const thumbEl = document.querySelector(".thumbSwiper");

  if (!mainEl || !thumbEl) {
    console.warn("⚠️ Swiper containers not found");
    return;
  }

  swiperInitialized = true;

  const thumbSwiper = new Swiper(thumbEl, {
    slidesPerView: 4,
    spaceBetween: 12,
    watchSlidesProgress: true,
    breakpoints: {
      320: { slidesPerView: 2 },
      576: { slidesPerView: 3 },
      992: { slidesPerView: 4 }
    }
  });

  new Swiper(mainEl, {
    loop: true,
    spaceBetween: 20,
    autoHeight: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    thumbs: {
      swiper: thumbSwiper
    },
    observer: true,
    observeParents: true
  });

  console.log("✅ Hero & Thumb Swipers initialized");
}

/* ===============================
   SLIDE DATA + RENDERING
================================ */
document.addEventListener("DOMContentLoaded", async () => {
  const slides = [
    {
      title: "Atomic Blonde",
      description: "MI6 agent Lorraine Broughton dives into Cold-War Berlin where betrayal is currency.",
      heroImage: "https://ntvb.tmsimg.com/assets/p12985371_v_h10_ak.jpg?w=1280&h=720",
      thumbImage: "./Assets/Img/Atomic Blonde Info Image.webp",
      watchLink: "./Atomic-Blonde.html",
      trailerLink: "https://www.youtube.com/watch?v=JIqcMl0hzXs"
    },
    {
      title: "Arrow",
      description: "A billionaire returns forged by hell and becomes Star City’s shadow.",
      heroImage: "./Assets/Img/Arrow Cover.webp",
      thumbImage: "./Assets/Img/Arrow Info-card.webp",
      watchLink: "./Tv-Shows/Arrow.html",
      trailerLink: "https://www.youtube.com/watch?v=_a3dNB2riKE"
    },
    {
      title: "Blue Beetle",
      description: "An alien scarab chooses Jaime Reyes—and nothing stays normal again.",
      heroImage: "./Assets/Img/Blue Beetle .webp",
      thumbImage: "./Assets/Img/Blue Beetle info-card.webp",
      watchLink: "./Action/Blue-Beetle.html",
      trailerLink: "https://www.youtube.com/watch?v=MaCllutk0_w"
    },
    {
      title: "Mission Impossible",
      description: "Ethan Hunt is framed, hunted, and forced to trust no one.",
      heroImage: "https://thecosmiccircus.com/wp-content/uploads/2023/11/ethan-2.png",
      thumbImage: "./Assets/Img/Mission Impossible 1.webp",
      watchLink: "./Mission-Impossible-1.html",
      trailerLink: "https://www.youtube.com/watch?v=L8Pbjh4EZRk"
    },
    {
      title: "Oppenheimer",
      description: "The mind behind the bomb—and the weight of what it unleashed.",
      heroImage: "https://cdn.theplaylist.net/wp-content/uploads/2023/05/08064650/Oppenheimer-Christopher-Nolan.jpg",
      thumbImage: "./Assets/Img10/Oppenheimer-Info-Card.webp",
      watchLink: "./Drama/Oppenheimer.html",
      trailerLink: "https://www.youtube.com/watch?v=uYPbbksJxIg"
    }
  ];

  await loadSwiperAssets();

  const mainWrapper = document.querySelector(".main-swiper-wrapper");
  const thumbWrapper = document.querySelector(".thumb-swiper-wrapper");

  mainWrapper.innerHTML = "";
  thumbWrapper.innerHTML = "";

  slides.forEach(item => {
    mainWrapper.insertAdjacentHTML("beforeend", `
      <div class="swiper-slide">
        <img src="${item.heroImage}" alt="${item.title}" class="img-fluid w-100 hero-img">
        <div class="hero-overlay">
          <div class="overlay-content">
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <div class="cta-group">
              <a href="${item.watchLink}" class="btn btn-in">
                <i class="fas fa-play"></i> Watch Now
              </a>
              <a href="${item.trailerLink}" class="btn btn-out">
                <i class="fas fa-film"></i> Trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    `);

    thumbWrapper.insertAdjacentHTML("beforeend", `
      <div class="swiper-slide thumb-slide">
        <img src="${item.thumbImage}" alt="${item.title}" class="thumb-img">
        <div class="thumb-overlay"><h6>${item.title}</h6></div>
      </div>
    `);
  });

  initHeroSwiper();
});
document.addEventListener("DOMContentLoaded", () => {
  const offcanvas = document.getElementById("mobileMenu");

  offcanvas.querySelectorAll(".dropdown-toggle").forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const menu = toggle.nextElementSibling;
      if (!menu) return;

      // Close any other open dropdowns inside this offcanvas
      offcanvas.querySelectorAll(".dropdown-menu.show").forEach(openMenu => {
        if (openMenu !== menu) openMenu.classList.remove("show");
      });

      // Toggle the clicked dropdown
      menu.classList.toggle("show");
    });
  });

  // Close dropdowns if you click outside
  document.addEventListener("click", (e) => {
    offcanvas.querySelectorAll(".dropdown-menu.show").forEach(menu => {
      if (!menu.contains(e.target) && !menu.previousElementSibling.contains(e.target)) {
        menu.classList.remove("show");
      }
    });
  });
});

  // (function() {
  //   // Create a new script element
  //   var script = document.createElement('script');

  //   // Set its attributes
  //   script.async = true;
  //   script.src = "https://js.mbidadm.com/static/scripts.js";
  //   script.setAttribute('data-admpid', '416517');

  //   // Append it to the <head>
  //   document.head.appendChild(script);
  // })();

 // Get the movie player div
const playerDiv = document.getElementById("movie-player");

// Target the iframe inside it
const iframe = playerDiv.querySelector("iframe");

// Add required attributes
iframe.setAttribute("allowfullscreen", "");
iframe.setAttribute("allowtransparency", "true");
iframe.setAttribute("allow", "autoplay");

// Get today's date in MM-DD
const today = new Date().toISOString().slice(5, 10);

// Festival theme definitions
const festivalThemes = {
  "12-25": { // Christmas
    "--festival-secondary-color": "#FF0000",
    "--festival-background-color": "#001F3F",
    "--festival-text-color": "#FFFFFF",
    "--festival-offcanvs-bg-image": "url('../festivals/christmas-bg.webp')",
    "--festival-font-family": "'Garamond', serif",
    "effects": "confetti"
  },
  "10-31": { // Halloween
    "--festival-secondary-color": "#FF7518",
    "--festival-background-color": "#000000",
    "--festival-text-color": "#FFA500",
    "--festival-offcanvs-bg-image": "url('../festivals/halloween-bg.webp')",
    "--festival-font-family": "'Creepster', cursive",
    "effects": "spooky-glow"
  },
  "04-10": { // Eid
    "--festival-secondary-color": "#4CAF50",
    "--festival-background-color": "#000000",
    "--festival-text-color": "#FFD700",
    "--festival-offcanvs-bg-image": "url('../festivals/eid-bg.webp')",
    "--festival-font-family": "'Amiri', serif",
    "effects": "subtle-glow"
  },
  "11-12": { // Diwali
    "--festival-secondary-color": "#FFAA00",
    "--festival-background-color": "#2E0854",
    "--festival-text-color": "#FFE066",
    "--festival-offcanvs-bg-image": "url('../festivals/diwali-bg.webp')",
    "--festival-font-family": "'Roboto', sans-serif",
    "effects": "fireworks"
  },
  "04-17": { // Easter
    "--festival-secondary-color": "#FF69B4",
    "--festival-background-color": "#FFF0F5",
    "--festival-text-color": "#6A5ACD",
    "--festival-offcanvs-bg-image": "url('../festivals/easter-bg.webp')",
    "--festival-font-family": "'Pacifico', cursive",
    "effects": "bunny-animation"
  },
  "12-18": { // Hanukkah
    "--festival-secondary-color": "#1E90FF",
    "--festival-background-color": "#000080",
    "--festival-text-color": "#FFFFFF",
    "--festival-offcanvs-bg-image": "url('../festivals/hanukkah-bg.webp')",
    "--festival-font-family": "'Cardo', serif",
    "effects": "candle-glow"
  },
  "03-08": { // Holi
    "--festival-secondary-color": "#FF1493",
    "--festival-background-color": "#FFFF00",
    "--festival-text-color": "#008000",
    "--festival-offcanvs-bg-image": "url('../festivals/holi-bg.webp')",
    "--festival-font-family": "'Comic Sans MS', cursive",
    "effects": "color-splash"
  },
  "06-28": { // Pride
    "--festival-secondary-color": "#FF69B4",
    "--festival-background-color": "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
    "--festival-text-color": "#FFFFFF",
    "--festival-offcanvs-bg-image": "url('../festivals/pride-bg.webp')",
    "--festival-font-family": "'Fredoka One', sans-serif",
    "effects": "rainbow-glow"
  },
  "04-07": { // Health Day
    "--festival-secondary-color": "#32CD32",
    "--festival-background-color": "#F0FFF0",
    "--festival-text-color": "#006400",
    "--festival-offcanvs-bg-image": "url('../festivals/health-bg.webp')",
    "--festival-font-family": "'Lato', sans-serif",
    "effects": "pulse-glow"
  }
};

// Apply festival theme if today matches
if (festivalThemes[today]) {
  const root = document.documentElement;
  const theme = festivalThemes[today];
  
  // Apply CSS variables
  for (let varName in theme) {
    if (varName.startsWith('--')) {
      root.style.setProperty(varName, theme[varName]);
    }
  }

  // Add festival-theme class
  document.body.classList.add("festival-theme");

  // Optional effects
  const effect = theme.effects;
  switch(effect){
    case "confetti":
      loadConfetti(); break;
    case "fireworks":
      loadFireworks(); break;
    case "spooky-glow":
    case "subtle-glow":
    case "candle-glow":
    case "pulse-glow":
    case "rainbow-glow":
      applyGlowEffect(effect); break;
    case "color-splash":
      loadColorSplash(); break;
    case "bunny-animation":
      loadBunnyAnimation(); break;
  }
}

// Minimal lightweight effect functions (examples)
function loadConfetti(){ console.log("🎉 Confetti effect loaded"); }
function loadFireworks(){ console.log("✨ Fireworks effect loaded"); }
function applyGlowEffect(type){ console.log(`💡 ${type} effect applied`); }
function loadColorSplash(){ console.log("🌈 Color splash effect loaded"); }
function loadBunnyAnimation(){ console.log("🐰 Bunny animation loaded"); }

// Function to dynamically append a script to <head>
function loadScript(src) {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    document.head.appendChild(script);
}

// Map festival effects to scripts
const festivalScripts = {
    "confetti": "https://app.embed.im/confetti.js",
    "snow": "https://app.embed.im/snow.js",
    "sparkles": "https://app.embed.im/sparkles.js",
    "balloons": "https://app.embed.im/balloons.js",
    "accessibility": "https://app.embed.im/accessibility.js" // always optional
};

// Example usage with your festival theme logic
if (festivalThemes[today]) {
    const theme = festivalThemes[today];
    document.body.classList.add("festival-theme");

    // Load main effect script
    switch(theme.effects){
        case "confetti":
            loadScript(festivalScripts.confetti); break;
        case "snow":
            loadScript(festivalScripts.snow); break;
        case "sparkles":
            loadScript(festivalScripts.sparkles); break;
        case "balloons":
            loadScript(festivalScripts.balloons); break;
    }

    // Load accessibility script for all festivals (optional)
    loadScript(festivalScripts.accessibility);
}

// Select all elements that have the data-aos attribute
const elements = document.querySelectorAll('[data-aos]');

// Loop through each element and remove the attribute
elements.forEach(el => {
    el.removeAttribute('data-aos');
});

console.log('All data-aos attributes removed ✅');

document.addEventListener("DOMContentLoaded", () => {
    const logoImg = document.querySelector(".navbar-brand .img-logo");
    if (!logoImg) {
        console.error("❌ Logo image not found!");
        return;
    }

    // Remove old src and hide temporarily to force repaint
    logoImg.removeAttribute("src");
    logoImg.removeAttribute("srcset");
    logoImg.removeAttribute("sizes");
    logoImg.style.display = "none";

    // URLs to try, in order
    const urls = [
        "https://flickrift.netlify.app/Assets/Logo.webp",
        "https://flickrift-v1.netlify.app/Assets/Logo.webp"
    ];

    let index = 0;

    // Function to try loading a URL
    function tryLoad() {
        if (index >= urls.length) {
            console.error("❌ All logo URLs failed to load!");
            return;
        }

        logoImg.src = urls[index];
        logoImg.style.display = ""; // show logo
        console.log(`⏳ Trying logo URL: ${urls[index]}`);

        // Listen for load/error
        logoImg.onerror = () => {
            console.warn(`⚠️ Failed to load logo from: ${urls[index]}`);
            index++;
            tryLoad(); // try next URL
        };

        logoImg.onload = () => {
            console.log(`✅ Navbar logo loaded from: ${urls[index]}`);
            // remove handlers
            logoImg.onerror = null;
            logoImg.onload = null;
        };
    }

    // Force repaint, then start loading
    requestAnimationFrame(() => {
        requestAnimationFrame(tryLoad);
    });
});

// Select all headings inside the container with class 'btn-head-wrapper'
const containers = document.querySelectorAll('.container.btn-head-wrapper');

containers.forEach(container => {
    const heading = container.querySelector('h2'); // get the h2 inside this container
    if (heading && !heading.id) {                 // check if heading exists and has no id
        heading.id = 'episode-header';           // add the id
        console.log('ID added to heading:', heading.textContent);
    }
});


