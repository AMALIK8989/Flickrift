document.addEventListener("DOMContentLoaded", () => {
  // --- Casted Cards ---
  const castedCards = document.querySelectorAll(".casted-card-wrapper");
  castedCards.forEach((card, index) => {
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", index * 100);
    card.setAttribute("data-aos-duration", "1000");
    card.setAttribute("data-aos-easing", "ease-in-out");
  });

  // --- Movie Pals Section ---
  const moviePals = document.querySelector("#movie-pals");
  if (moviePals) {
    moviePals.setAttribute("data-aos", "fade-zoom-in");
    moviePals.setAttribute("data-aos-easing", "ease-in-back");
    moviePals.setAttribute("data-aos-delay", "200");

    const title = moviePals.querySelector("h2");
    if (title) {
      title.setAttribute("data-aos", "zoom-in-up");
      title.setAttribute("data-aos-delay", "400");
      title.setAttribute("data-aos-duration", "1200");
    }

    const player = moviePals.querySelector("#movie-player");
    if (player) {
      player.setAttribute("data-aos", "fade-up");
      player.setAttribute("data-aos-delay", "600");
      player.setAttribute("data-aos-duration", "1500");
    }
  }

  // --- Description Section ---
  const description = document.querySelector("#description");
  if (description) {
    description.setAttribute("data-aos", "fade-up");
    description.setAttribute("data-aos-delay", "200");
    description.setAttribute("data-aos-duration", "1200");

    const descTitle = description.querySelector("h2");
    if (descTitle) {
      descTitle.setAttribute("data-aos", "fade-down");
      descTitle.setAttribute("data-aos-delay", "400");
      descTitle.setAttribute("data-aos-duration", "1000");
    }

    const descPara = description.querySelector("p");
    if (descPara) {
      descPara.setAttribute("data-aos", "fade-right");
      descPara.setAttribute("data-aos-delay", "600");
      descPara.setAttribute("data-aos-duration", "1200");
    }
  }

  // --- Genre Sections ---
  const genreSections = document.querySelectorAll(".genre-section");
  genreSections.forEach(section => {
    const sectionTitle = section.querySelector(".genre-title");
    if (sectionTitle) {
      sectionTitle.setAttribute("data-aos", "zoom-in");
      sectionTitle.setAttribute("data-aos-delay", "200");
      sectionTitle.setAttribute("data-aos-duration", "1000");
    }

    const cards = section.querySelectorAll(".genre-card");
    cards.forEach((card, index) => {
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", 300 + index * 150);
      card.setAttribute("data-aos-duration", "800");
      card.setAttribute("data-aos-easing", "ease-in-out");
    });
  });

  // --- INIT AOS *after* all attributes are set ---
  AOS.init({
    offset: 120,
    duration: 1000,
    easing: "ease-in-out",
    once: false,
    mirror: true,
  });

  AOS.refresh();
});
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