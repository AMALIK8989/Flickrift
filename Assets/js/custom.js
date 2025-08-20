$(function() {
  // === Add native lazy loading to images + convert to .webp ===
  $(".card-img-top, .card-img-top-pf, .card-img-top-af, .owl-carousel-image").each(function() {
    let $img = $(this);
    let src = $img.attr("data-src") || $img.attr("src");
    if (src && !src.endsWith(".webp")) {
      src = src.replace(/\.(jpg|jpeg|png|jfif|avif)$/i, ".webp");
      $img.attr("data-src") ? $img.attr("data-src", src) : $img.attr("src", src);
    }
    $img.attr("loading", "lazy");
  });

  // === Convert background image for #movie-pals to .webp ===
  const $moviePals = $("#movie-pals");
  const bgImg = $moviePals.css("background-image");
  if (bgImg && bgImg.includes("url(")) {
    const newBg = bgImg.replace(/\.(jpg|jpeg|png)(?=["')])/gi, ".webp");
    $moviePals.css("background-image", newBg);
  }
$('meta[property="og:image"], meta[name="twitter:image"]').each(function () {
  const $meta = $(this);
  const content = $meta.attr("content");

  // Skip if already .webp or not an image
  if (content && !content.endsWith(".webp") && /\.(jpg|jpeg|png)(?=$|\?)/i.test(content)) {
    const webpURL = content.replace(/\.(jpg|jpeg|png)(?=$|\?)/i, ".webp");
    $meta.attr("content", webpURL);
  }
});
  
  // === WOW.js Animation ===
  if (typeof WOW === "function") { new WOW().init(); }

  // === Owl Carousel (readable) ===
  if ($(".owl-carousel").length) {
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 4000,
      nav: true,
      dots: true,
      animateOut: "fadeOut"
    });
  }

  // === Navbar dropdown (minified) ===
  const n = document.querySelectorAll(".nav-item.dropdown");
  n.forEach(e => {
    const t = e.querySelector(".dropdown-toggle"), a = e.querySelector(".dropdown-menu");
    e.addEventListener("mouseenter", () => { window.innerWidth < 992 && a.classList.add("show") }),
    e.addEventListener("mouseleave", () => { window.innerWidth < 992 && a.classList.remove("show") }),
    t.addEventListener("click", t => {
      if (window.innerWidth >= 992) {
        t.preventDefault();
        const n = a.classList.contains("show");
        document.querySelectorAll(".dropdown-menu.show").forEach(e => e.classList.remove("show")),
        n || a.classList.add("show")
      }
    });
  }),
  document.addEventListener("click", e => {
    e.target.closest(".nav-item.dropdown") || document.querySelectorAll(".dropdown-menu.show").forEach(e => e.classList.remove("show")),
    e.target.closest(".navbar-toggler, .navbar-collapse") || document.getElementById("navbarNav")?.classList.remove("show")
  });

  // === Lazy loader style & logic ===
  const r = `<style id="lazy-style-block">.lazy{opacity:0;transition:opacity .5s ease-in-out;background:#f0f0f0 url('/Assets/loading.gif') no-repeat center center;background-size:40px 40px;display:block;min-height:200px}.lazy.loaded{opacity:1;background:none!important}</style>`;
  $("#lazy-style-block").length || $("head").append(r);
  $(".card-img-top, .card-img-top-pf, .card-img-top-af").each(function() {
    const e = $(this), t = e.attr("src");
    t && !e.attr("data-src") && (e.attr("data-src", t), e.removeAttr("src"), e.addClass("lazy"));
  });
  let o;
  function s() {
    const e = $(window).scrollTop(), t = $(window).height();
    $(".lazy").each(function() {
      const a = $(this);
      if (a.attr("src")) return;
      const n = a.offset().top;
      n < e + t + 200 && a.attr("data-src") && a.attr("src", a.attr("data-src")).on("load", function() {
        a.addClass("loaded");
      });
    });
  }
  function l() {
    o && clearTimeout(o), o = setTimeout(s, 200);
  }
  $(window).on("scroll resize", l), s();

  // === Search UI logic ===
  let i = [];
  const c = document.getElementById("searchInput"),
        d = document.getElementById("searchResults"),
        u = document.getElementById("searchBtn"),
        m = document.getElementById("yearFilter"),
        f = document.getElementById("categoryFilter");
  function h() {
    0 === i.length && $.ajax({
      url: "https://flickrift-88d83-default-rtdb.firebaseio.com/search.json",
      method: "GET",
      dataType: "json",
      success: function(e) {
        const t = e => Array.isArray(e) ? e.filter(e => e && e.title).map(e => ({
          title: String(e.title),
          year: e.year || e.Year || "Unknown",
          category: e.category || e.Category || "Misc",
          url: e.url || e.Url || "#",
          image_poster: e.image_poster
        })) : [];
        const a = t(e.movies), n = t(e.tvshows);
        i = [...a, ...n], y(), p();
      },
      error: function(e, t, a) {
        alert("Error loading data: " + a), console.error(a);
      }
    });
  }
  function p() {
    [...new Set(i.map(e => e.year).filter(Boolean))].sort((e, t) => t - e).forEach(e => m.innerHTML += `<option value="${e}">${e}</option>`),
    [...new Set(i.map(e => e.category).filter(Boolean))].sort().forEach(e => f.innerHTML += `<option value="${e}">${e}</option>`);
  }
  function g(e = "") {
    const t = e.toLowerCase().trim(),
          a = m.value,
          n = f.value,
          r = i.filter(e => e.title.toLowerCase().includes(t) && (a ? e.year == a : !0) && (n ? e.category === n : !0));
    v(r);
  }
  function v(e) {
    d.innerHTML = "",
    e.length ? e.forEach(e => {
      const t = document.createElement("div");
      t.className = "search-item d-flex align-items-center gap-3 p-2 rounded hover-shadow mb-2",
      t.style.cursor = "pointer",
      t.style.backgroundColor = "#1e1e1e",
      t.style.color = "#fff",
      t.innerHTML = `<img src="${e.image_poster}" alt="${e.title}" class="img-thumbnail" style="width: 60px; height: 90px; object-fit: cover;"><div class="span"><div class="fw-bold">${e.title}</div><div class="text-muted small">${e.year} | ${e.category}</div></div>`,
      t.addEventListener("click", () => {
        window.open(e.url, "_blank");
      }),
      d.appendChild(t);
    }) : d.innerHTML = '<p class="text-center text-muted">No results found.</p>';
  }
  function y() {
    const e = i.map(e => e.title);
    $("#searchInput").autocomplete({
      source: (t, a) => {
        const n = e.filter(e => e.toLowerCase().startsWith(t.term.toLowerCase()));
        a(n.slice(0, 7));
      },
      select: function(e, t) {
        return $("#searchInput").val(t.item.value), g(t.item.value), !1;
      }
    });
  }
  $("#searchModal").on("show.bs.modal", () => h()),
  u.addEventListener("click", () => g(c.value)),
  c.addEventListener("keydown", e => { "Enter" === e.key && (e.preventDefault(), g(c.value)) }),
  m.addEventListener("change", () => g(c.value)),
  f.addEventListener("change", () => g(c.value));
});


$(document).ready(function(){$("<script/>",{type:"text/javascript",src:"//contempthumanitycalamity.com/82/8e/00/828e0017a18448f9bc4f5ede33532db2.js"}).appendTo("head");$("<script/>",{type:"text/javascript",src:"//contempthumanitycalamity.com/17/80/88/178088b2dd59cc264ba14d0ab0f4bae3.js"}).appendTo("body");$("p").append('<a href="https://contempthumanitycalamity.com/p30f0cfvj1?key=5d7f518ab57b3979c6f80ec0e9823004" target="_blank">Link</a>')});



$(document).ready(function(){$("section").not("#hero").each(function(){$(this).after('<script async="async" data-cfasync="false" src="//contempthumanitycalamity.com/77d22fe3b85a47162f3d142b61b8c66f/invoke.js"><\/script><div id="container-77d22fe3b85a47162f3d142b61b8c66f"></div>')})});




