document.addEventListener("DOMContentLoaded", () => {
  // Don't run this on the /app page
  if (window.location.href === "https://flickrift.netlify.app/app" ||
      window.location.href === "https://flickrift.netlify.app/app/") {
    console.log("⚠️ Skipping asset removal on /app page");
    return;
  }

  // Array of CSS/JS URLs to remove
  const assetsToRemove = [
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.css"
  ];

  // Remove <link> tags
  document.querySelectorAll("link[rel='stylesheet']").forEach(link => {
    if (assetsToRemove.includes(link.href)) {
      link.remove();
      console.log(`🗑 Removed CSS: ${link.href}`);
    }
  });

  // Remove <script> tags
  document.querySelectorAll("script[src]").forEach(script => {
    if (assetsToRemove.includes(script.src)) {
      script.remove();
      console.log(`🗑 Removed JS: ${script.src}`);
    }
  });
});
