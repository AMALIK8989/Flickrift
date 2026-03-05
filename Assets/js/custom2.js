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
    AOS.init({
    once: false
});
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

document.addEventListener('DOMContentLoaded', () => {
    const movieSwiper = new Swiper('#featured-movies-slider', {
      slidesPerView: 1,       // Default for mobile
      spaceBetween: 20,       // Space between slides
      loop: true,             // Infinite loop
      navigation: {
        nextEl: '#slider-next',
        prevEl: '#slider-prev',
      },
      pagination: {
        el: '#slider-pagination',
        clickable: true,
      },
      breakpoints: {
        576: { slidesPerView: 2 },   // ≥576px
        768: { slidesPerView: 3 },   // ≥768px
        992: { slidesPerView: 4 },   // ≥992px
        1200: { slidesPerView: 5 },  // ≥1200px
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      grabCursor: true,
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

// document.addEventListener("DOMContentLoaded", function () {
//   const logo = document.querySelector(".img-logo");
  
//   if (logo) {
//     logo.setAttribute("width", "200");
//     logo.setAttribute("height", "130");
//   }
// });

// Select the container div
const container = document.querySelector('.container.btn-head-wrapper');

if (container) {
  // Find the h2 inside it
  const heading = container.querySelector('h2');

  // Only add the id if it doesn't already exist
  if (heading && !heading.id) {
    heading.id = 'episode-header';
  }
}

  var swiper = new Swiper(".movieSwiper", {
        slidesPerView: 1, // Default for mobile
        spaceBetween: 20,
        grabCursor: true,
        loop: false, // Set to true if you want infinite loop
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 576px
            576: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            // when window width is >= 992px
            992: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            // when window width is >= 1200px
            1200: {
                slidesPerView: 5,
                spaceBetween: 30
            }
        }

    });

document.addEventListener("DOMContentLoaded", function () {

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 1000,
            once: false,
            disable: false,
            startEvent: 'load',
            offset: 120,
            mirror: true
        });

        window.addEventListener("load", function () {
            AOS.refreshHard();
        });

    } else {
        console.error("AOS library not loaded");
    }

});

