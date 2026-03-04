
document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------
       1. Inject robots meta
    -------------------------------- */
    if (!document.querySelector('meta[name="robots"]')) {
        const m = document.createElement("meta");
        m.name = "robots";
        m.content = "index, follow";
        document.head.appendChild(m);
    }

    /* -------------------------------
       2. Background lazy-load (#movie-pals)
    -------------------------------- */
   (function startWhenReady() {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        initMoviePalsBG();
    } else {
        document.addEventListener("DOMContentLoaded", initMoviePalsBG);
    }
})();

function initMoviePalsBG() {
    console.log("🎬 movie-pals: background script started (head-safe)");

    const section = document.getElementById("movie-pals");
    if (!section) return console.warn("❌ #movie-pals not found");

    const bg = getComputedStyle(section).backgroundImage;
    const match = bg.match(/url\(["']?(.*?)["']?\)/);
    if (!match) return console.warn("⚠️ No background found");

    const originalSrc = match[1];
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png|jfif|avif)$/i, ".webp");

    section.style.backgroundImage = "none";

    console.log("🔍 original:", originalSrc);
    console.log("🔁 webp:", webpSrc);

    const loadWebp = () => {
        const img = new Image();
        img.onload = () => {
            section.style.backgroundImage = `url("${webpSrc}")`;
            console.log("🚀 Loaded WebP:", webpSrc);
        };
        img.onerror = () => {
            section.style.backgroundImage = `url("${originalSrc}")`;
            console.warn("❌ WebP failed. Using original:", originalSrc);
        };
        img.src = webpSrc;
    };

    if ("IntersectionObserver" in window) {
        new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                loadWebp();
                obs.unobserve(section);
            }
        }).observe(section);
    } else {
        setTimeout(loadWebp, 300);
    }
}




    /* -------------------------------
       3. Convert OG/Twitter images to WEBP
    -------------------------------- */
    document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(tag => {
        const content = tag.getAttribute("content");
        if (content && /\.(jpg|jpeg|png)(\?|$)/i.test(content)) {
            tag.setAttribute("content", content.replace(/\.(jpg|jpeg|png)(?=\?|$)/i, ".webp"));
        }
    });

    /* -------------------------------
       4. WOW.js (if loaded)
    -------------------------------- */
    if (window.WOW) new WOW().init();

    /* -------------------------------
       5. Owl Carousel (if available)
    -------------------------------- */
    if (window.jQuery && jQuery(".owl-carousel").length) {
        jQuery(".owl-carousel").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 4000,
            nav: true,
            dots: true,
            animateOut: "fadeOut"
        });
    }

    /* -------------------------------
       6. Lazy load images
    -------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    console.log("🎬 Buckle up! Starting lazy image setup... Commando mode ON 🟢");

    // Helper: convert any image URL extension to .webp
    const toWebP = (url) => {
        try {
            const newUrl = url.replace(/\.(jpg|jpeg|png|jfif|avif)$/i, ".webp");
            console.log(`🖼️✨ Boom! Converted URL to WebP: ${newUrl}`);
            return newUrl;
        } catch (e) {
            console.error(`💥 Whoops! Failed to convert URL: ${url}`, e);
            return url; // fallback
        }
    };

    // Initialize lazy loading
    const images = document.querySelectorAll(".card-img-top, .card-img-top-pf, .card-img-top-af");
    images.forEach((img, index) => {
        try {
            if (img.src && !img.dataset.src) {
                img.dataset.src = toWebP(img.src); // convert to .webp
                img.removeAttribute("src");
                img.setAttribute("loading", "lazy"); // add lazy attribute
                // keep original alt
                console.log(`🟢 Image #${index + 1} armed and ready for lazy loading: ${img.dataset.src}`);
            } else {
                console.log(`⚠️ Image #${index + 1} already armed or has no src... moving on 🏃‍♂️`);
            }
        } catch (e) {
            console.error(`💣 Explosion! Failed to initialize image #${index + 1}`, e);
        }
    });

    // Lazy load function
    const lazyLoad = () => {
        const windowBottom = window.scrollY + window.innerHeight + 200;
        document.querySelectorAll("[loading='lazy']").forEach((img, index) => {
            try {
                if (!img.dataset.src || img.src) return;

                const top = img.getBoundingClientRect().top + window.scrollY;
                if (top < windowBottom) {
                    img.src = img.dataset.src;
                    console.log(`🚀 Image #${index + 1} fired from lazy storage: ${img.src}`);
                }
            } catch (e) {
                console.error(`💀 Image #${index + 1} refused to load!`, e);
            }
        });
    };

    // Attach scroll and resize events
    window.addEventListener("scroll", () => requestAnimationFrame(lazyLoad));
    window.addEventListener("resize", () => requestAnimationFrame(lazyLoad));

    // Initial load
    console.log("🚀 Initiating first strike on lazy images...");
    lazyLoad();
    console.log("🎉 All lazy images checked and ready for action! ✅ Commando mission complete!");
});


    /* -------------------------------
       7. Firebase Search
    -------------------------------- */

    let dataset = [];
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchBtn = document.getElementById("searchBtn");
    const yearFilter = document.getElementById("yearFilter");
    const categoryFilter = document.getElementById("categoryFilter");

    async function loadSearch() {
        if (dataset.length) return;

        const res = await fetch("https://flickrift-88d83-default-rtdb.firebaseio.com/search.json");
        const data = await res.json();

        const parse = arr =>
            Array.isArray(arr)
                ? arr.filter(x => x && x.title).map(x => ({
                      title: String(x.title),
                      year: x.year || x.Year || "Unknown",
                      category: x.category || x.Category || "Misc",
                      url: x.url || x.Url || "#",
                      image_poster: x.image_poster
                  }))
                : [];

        dataset = [...parse(data.movies), ...parse(data.tvshows)];

        populateFilters();
    }

    function populateFilters() {
        [...new Set(dataset.map(x => x.year))].sort((a, b) => b - a)
            .forEach(y => yearFilter.innerHTML += `<option value="${y}">${y}</option>`);

        [...new Set(dataset.map(x => x.category))].sort()
            .forEach(cat => categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`);
    }

    function filterSearch(term = "") {
        const t = term.toLowerCase().trim();
        const y = yearFilter.value;
        const c = categoryFilter.value;

        const results = dataset.filter(x =>
            x.title.toLowerCase().includes(t) &&
            (!y || x.year == y) &&
            (!c || x.category === c)
        );

        renderResults(results);
    }

    function renderResults(arr) {
        searchResults.innerHTML = arr.length
            ? arr.map(x => `
                <div class="search-item d-flex align-items-center gap-3 p-2 rounded hover-shadow mb-2" 
                     style="cursor:pointer;background:#1e1e1e;color:#fff;"
                     onclick="window.open('${x.url}', '_blank')">
                    <img src="${x.image_poster}" class="img-thumbnail" style="width:60px;height:90px;object-fit:cover;">
                    <div>
                        <div class="fw-bold">${x.title}</div>
                        <div class="small text-muted">${x.year} | ${x.category}</div>
                    </div>
                </div>
            `).join("")
            : `<p class="text-center text-muted">No results found.</p>`;
    }

    document.getElementById("searchModal")
        .addEventListener("show.bs.modal", loadSearch);

    searchBtn.addEventListener("click", () => filterSearch(searchInput.value));
    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            filterSearch(searchInput.value);
        }
    });
    yearFilter.addEventListener("change", () => filterSearch(searchInput.value));
    categoryFilter.addEventListener("change", () => filterSearch(searchInput.value));

    /* -------------------------------
       8. Favicon injection
    -------------------------------- */
    const icons = [
        { rel: "icon", type: "image/x-icon", href: "../Assets/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "../Assets/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "../Assets/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "../Assets/favicon-16x16.png" },
        { rel: "manifest", href: "../Assets/site.webmanifest" }
    ];

    icons.forEach(attr => {
        const exists = [...document.querySelectorAll("head link")].some(link =>
            Object.entries(attr).every(([k, v]) => link.getAttribute(k) === v)
        );
        if (!exists) {
            const link = document.createElement("link");
            Object.entries(attr).forEach(([k, v]) => link.setAttribute(k, v));
            document.head.appendChild(link);
        }
    });

    /* -------------------------------
       9. Google Ads async loader
    -------------------------------- */
    const ads = document.createElement("script");
    ads.async = true;
    ads.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9522598653194866";
    ads.crossOrigin = "anonymous";
    document.head.appendChild(ads);

});

(function(){const script=document.createElement("script");script.type="text/javascript";script.async=true;script.setAttribute("data-cfasync","false");script.textContent=`

 /*<![CDATA[/* */
 (function () {
  var win = window,
      key = "d91306996e18cbebde8726749ce77179",
      config = [
       ["siteId", 898 * 139 + 910 - 35 + 5105304],
       ["minBid", 0],
       ["popundersPerIP", "0"],
       ["delayBetween", 0],
     ["default", false],
       ["defaultPerDay", 0],
        ["topmostLayer", "auto"]
      ],
      encoded = [
        "d3d3LmJldHRlcmFkc3lzdGVtLmNvbS9lZ2V0dGV4dC5janMubWluLmNzcw==",
        "ZDJrazBvM2ZyN2VkMDEuY2xvdWRmcm9udC5uZXQvbmVvS2NpL2VzaGEyNTYubWluLmpz"
      ],
       index = -1, timeout, loader;

  loader = function () {
     clearTimeout(timeout);
    index++;

    if (encoded[index] && !((new Date).getTime() > 1789653320000 && index > 1)) {
      var s = win.document.createElement("script");
      s.type = "text/javascript";
       s.async = true;

      var ref = win.document.getElementsByTagName("script")[0];
      s.src = "https://" + atob(encoded[index]);
      s.crossOrigin = "anonymous";
       s.onerror = loader;

      s.onload = function () {
       clearTimeout(timeout);
       win[key.slice(0, 16) + key.slice(0, 16)] || loader();
      };

      timeout = setTimeout(loader, 5000);
     ref.parentNode.insertBefore(s, ref);
    }
  };

   if (!win[key]) {
     try {
      Object.freeze(win[key] = config);
    } catch (e) {}
    loader();
   }
})();
/*]]>/* */

  `;document.head.appendChild(script)})();const t=document.createComment(" Google tag (gtag.js) ");document.head.appendChild(t);const a=document.createElement("script");a["async"]=true;a.src="https://www.googletagmanager.com/gtag/js?id=G-NSHJVPCJ9H";document.head.appendChild(a);const g=document.createElement("script");g.textContent=`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NSHJVPCJ9H');
`;document.head.appendChild(g);document.addEventListener("DOMContentLoaded",()=>{const o=["./Assets/js/remove.js","../Assets/js/remove.js"];const t=(o,e=0)=>{if(e>=o.length)return console.warn("⚠️ remove.js not found");const s=document.createElement("script");s.src=o[e];s.defer=true;s.onload=()=>console.log(`✅ remove.js loaded from: ${o[e]}`);s.onerror=()=>{console.warn(`❌ Failed to load remove.js from: ${o[e]}, trying next path...`);t(o,e+1)};document.head.appendChild(s)};t(o)});window.addEventListener("DOMContentLoaded",()=>{const e=["bootstrap.min.js","wow.min.js","font-awesome","jquery-3.6.0.min.js","owl.carousel.min.js","swiper-bundle.min.js"];const n=Array.from(document.querySelectorAll("script[src]"));n.forEach(n=>{const o=n.src;const s=e.some(n=>o.includes(n));if(s){const t=document.createElement("script");t.src=o;t.defer=true;t["async"]=false;document.body.appendChild(t);n.remove()}})});const usercentricsScript=document.createElement("script");usercentricsScript.id="usercentrics-cmp";usercentricsScript.src="https://app.usercentrics.eu/browser-ui/latest/loader.js";usercentricsScript.setAttribute("data-settings-id","CpXNJ6Rw_IrguB");usercentricsScript.async=true;document.head.appendChild(usercentricsScript);document.addEventListener("DOMContentLoaded",()=>{const e="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9522598653194866";document.querySelectorAll("script[src]").forEach(o=>{if(o.src===e){console.log("Removing AdSense script:",o.src);o.remove()}})});$(function(){console.log("🚀 custom.js booted — searching for navbar.js...");const o=["./Assets/js/navbar.js","../Assets/js/navbar.js","../../Assets/js/navbar.js","../../../Assets/js/navbar.js"];function n(s=0){if(s>=o.length){console.warn("⚠️ navbar.js not found.");return}$.getScript(o[s]).done(()=>console.log(`✅ navbar.js loaded from: ${o[s]}`)).fail(()=>{console.warn(`❌ Failed to load navbar.js from: ${o[s]}`);n(s+1)})}n()});document.addEventListener("DOMContentLoaded",()=>{console.log("%c🖼️ Image Optimizer Booting Up...","color:#0ff;font-weight:bold;font-size:16px;");console.log("%cScanning cards for image upgrades... 🔍","color:#ff80ff;font-style:italic;");const images=document.querySelectorAll(".card-img-top, .card-img-top-pf, .card-img-top-af");let convertedCount=0;let deferredCount=0;images.forEach(img=>{let src=img.getAttribute("data-src")||img.getAttribute("src");if(!src)return;if(!src.endsWith(".webp")){src=src.replace(/\.(jpg|jpeg|png|jfif|avif)$/i,".webp");if(img.hasAttribute("data-src")){img.setAttribute("data-src",src)}else{img.setAttribute("src",src)}convertedCount++}img.setAttribute("loading","lazy");img.setAttribute("decoding","async");if(!img.getAttribute("data-defer-src")){const currentSrc=img.getAttribute("src")||img.getAttribute("data-src");img.setAttribute("data-defer-src",currentSrc);img.removeAttribute("src");deferredCount++}const loadDeferred=()=>{const deferredSrc=img.getAttribute("data-defer-src");if(deferredSrc&&!img.getAttribute("src")){img.setAttribute("src",deferredSrc);img.removeAttribute("data-defer-src")}};if("requestIdleCallback"in window){requestIdleCallback(loadDeferred,{timeout:1500})}else{setTimeout(loadDeferred,1e3)}});console.log(`%c✅ WebP Conversion Complete: ${convertedCount} image${convertedCount!==1?"s":""} optimized.`,"color:#00ff99;font-weight:bold;");console.log(`%c🕓 Deferred Loading Set For: ${deferredCount} image${deferredCount!==1?"s":""}.`,"color:#ffcc00;font-weight:bold;");console.log("%c🚀 Lazy Loading & Async Decoding Engaged!","color:#ff69b4;font-weight:bold;");console.log("%c✨ Image optimization complete. Your page just got faster 💨","color:#0ff;font-weight:bold;")});function addFaviconLinks(){const assetsFolderName="Assets";const linksToAdd=[{rel:"icon",type:"image/x-icon",href:"favicon.ico"},{rel:"apple-touch-icon",sizes:"180x180",href:"apple-touch-icon.png"},{rel:"icon",type:"image/png",sizes:"32x32",href:"favicon-32x32.png"},{rel:"icon",type:"image/png",sizes:"16x16",href:"favicon-16x16.png"},{rel:"manifest",href:"site.webmanifest"}];console.log("%c🤖 Favicon Bot 5000 Activated! 🚀","font-size: 20px; font-weight: bold; color: #4CAF50; background: #E8F5E9; padding: 10px; border-radius: 5px; border: 2px solid #4CAF50;");function getRelativePathToAssets(){const path=window.location.pathname;const pathParts=path.split("/");const directoryDepth=pathParts.length-2;let relativePath="";if(directoryDepth>0){relativePath="../".repeat(directoryDepth)}else{relativePath="./"}return relativePath+assetsFolderName+"/"}const basePath=getRelativePathToAssets();console.log(`%c🧭 Calculated path to Assets: ${basePath}`,"color: #2196F3; font-weight: bold;");let addedCount=0;let skippedCount=0;linksToAdd.forEach(linkConfig=>{let selector=`link[rel="${linkConfig.rel}"]`;if(linkConfig.sizes){selector+=`[sizes="${linkConfig.sizes}"]`}if(!document.querySelector(selector)){const newLink=document.createElement("link");newLink.rel=linkConfig.rel;newLink.href=basePath+linkConfig.href;if(linkConfig.type)newLink.type=linkConfig.type;if(linkConfig.sizes)newLink.sizes=linkConfig.sizes;document.head.appendChild(newLink);console.log(`%c✅ Deploying: ${linkConfig.href} -> ${newLink.href}`,"color: #388E3C; font-weight: bold;");addedCount++}else{console.log(`%c🧐 Scanned... ${linkConfig.href} is already wired up. No duplicates!`,"color: #FFA726; font-style: italic;");skippedCount++}});console.log(`%c🎉 Mission Complete! Added ${addedCount} new icons, skipped ${skippedCount}. All systems nominal.`,"font-size: 16px; font-weight: bold; color: #D32F2F; background: #FFEBEE; padding: 8px; border-radius: 5px;")}addFaviconLinks();document.addEventListener("DOMContentLoaded",()=>{const cards=document.querySelectorAll("#card-wrapper");cards.forEach(card=>{card.removeAttribute("id")});console.log(`Removed id from ${cards.length} cards.`)});document.addEventListener("DOMContentLoaded",function(){const paginationList=document.getElementById("pagination-list");const pageItems=paginationList.querySelectorAll(".page-item:not(#pagination-prev):not(#pagination-next)");const prevBtn=document.getElementById("pagination-prev");const nextBtn=document.getElementById("pagination-next");function setActivePage(newActive){pageItems.forEach(item=>item.classList.remove("active"));newActive.classList.add("active")}pageItems.forEach(item=>{item.addEventListener("click",function(){setActivePage(item);const link=item.querySelector("a");if(link){window.location.href=link.href}})});prevBtn.addEventListener("click",function(){const currentIndex=Array.from(pageItems).findIndex(item=>item.classList.contains("active"));if(currentIndex>0){setActivePage(pageItems[currentIndex-1]);const link=pageItems[currentIndex-1].querySelector("a");if(link)window.location.href=link.href}});nextBtn.addEventListener("click",function(){const currentIndex=Array.from(pageItems).findIndex(item=>item.classList.contains("active"));if(currentIndex<pageItems.length-1){setActivePage(pageItems[currentIndex+1]);const link=pageItems[currentIndex+1].querySelector("a");if(link)window.location.href=link.href}})});;document.addEventListener("DOMContentLoaded",()=>{const link=document.createElement("link");link.rel="stylesheet";link.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css";link.integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==";link.crossOrigin="anonymous";link.referrerPolicy="no-referrer";document.head.appendChild(link)});document.addEventListener("DOMContentLoaded",()=>{console.log("%c🎬 Cast Column Commander Activated!","color:#ff69b4;font-weight:bold;font-size:16px;");console.log("%c🚀 Scanning for cast-card elements to optimize...","color:#0ff;font-style:italic;");const castCards=document.querySelectorAll(".cast-card");let updatedCount=0;castCards.forEach(el=>{const desiredClasses=["col-sm-12","col-md-4","col-lg-4"];const alreadyChanged=desiredClasses.every(cls=>el.classList.contains(cls));if(!alreadyChanged){el.classList.remove("col-12","col-sm-6");el.classList.add(...desiredClasses);updatedCount++;console.log(`%c✨ Updated cast-card!`,"color:#ffcc00;",el)}else{console.log(`%c✅ Already perfect, skipping...`,"color:#00ff99;",el)}});console.log(`%c🎉 Mission Complete! ${updatedCount} cast-card${updatedCount!==1?"s":""} updated.`,"color:#ff69b4;font-weight:bold;font-size:14px;")});

  (function () {
    // URL where we DON'T want to load the footer stylesheet
    const blockedURL = "https://flickrift.netlify.app/";
    if (window.location.href === blockedURL) return;

    /** 
     * STEP 1: Detect how deep the page is from root 
     * Count folder levels in current path 
     */
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1; 

    /**
     * STEP 2: Build a prefix like:
     * depth 0 → ""
     * depth 1 → "../"
     * depth 2 → "../../"
     * depth 3 → "../../../" etc.
     */
    let prefix = "";
    for (let i = 0; i < depth; i++) prefix += "../";

    // STEP 3: final resolved path to footer.css
    const finalCSSPath = prefix + "Assets/css/footer.css";

    /**
     * STEP 4: Check if footer.css is already loaded
     */
    const alreadyAdded = Array.from(document.styleSheets).some(sheet => {
        return sheet.href && sheet.href.includes("footer.css");
    });

    /**
     * STEP 5: If not loaded, inject
     */
    if (!alreadyAdded) {
        const linkTag = document.createElement("link");
        linkTag.rel = "stylesheet";
        linkTag.href = finalCSSPath;
        document.head.appendChild(linkTag);
        console.log(`footer.css loaded from: ${finalCSSPath}`);
    } else {
        console.log("footer.css already present, skipping 😎");
    }
})();
// 🎥🍿 MOVIE COLUMN COMMANDER: Ready for Deployment 🍿🎥

// 🚨 Activate commander protocol
console.log("🔐 Activating Movie Column Commander...");

// 🪖 Boot-up procedure
const commanderStatus = "🟢 Commander Online";
console.log(commanderStatus);

// 🎯 Target classes to enforce
const targetClasses = [
  "col-12",
  "col-sm-6",
  "col-md-4",
  "col-lg-3",
  "col-xl-2",
  "mb-4"
];

// 🎬 Hunt down valid card-wrapper IDs
const wrappers = document.querySelectorAll('[id^="card-wrapper"]');

// 🚀 Mission: Add missing classes, avoid duplicates
wrappers.forEach((wrapper, index) => {
    console.log(`🎯 Target Acquired: #${wrapper.id}`);

    targetClasses.forEach(c => {
        if (!wrapper.classList.contains(c)) {
            wrapper.classList.add(c);
            console.log(`➕ Added: ${c} to #${wrapper.id}`);
        } else {
            console.log(`⚠️ Already Present: ${c} on #${wrapper.id}`);
        }
    });

    console.log(`📦 Wrapper #${wrapper.id} loadout complete 🎖️`);
});

// 🎉 Installation complete
console.log("🚀 Installation Complete! 🍿 Movie Column Commander Ready! 🎬");

/*******************************************************
 * 🎬 Movie Image Container Fixer — Robust Edition
 * Wraps lone <img> inside .card into <div.card-img-container>
 * Works on initial load + dynamically injected cards.
 *******************************************************/

(function MovieImageContainerFixer() {
  console.log("🍿 Movie Image Container Fixer initializing...");

  // classes to add/wrap
  const WRAPPER_CLASS = "card-img-container";
  const PROCESSED_FLAG = "data-mic-wrapped";

  // selector for likely target images (scoped to .card)
  const IMAGE_SELECTOR = ".card img";

  // try to wrap a single image node, return true if wrapped/skipped
  function wrapImageIfNeeded(img) {
    if (!img || img.nodeType !== 1 || img.tagName !== "IMG") return false;

    // already processed?
    if (img.hasAttribute(PROCESSED_FLAG)) return false;

    // already inside a proper wrapper?
    if (img.closest(`.${WRAPPER_CLASS}`)) {
      img.setAttribute(PROCESSED_FLAG, "already");
      console.log(`🔎 Skipping (already wrapped):`, img);
      return false;
    }

    // create wrapper and move the image into it
    try {
      const wrapper = document.createElement("div");
      wrapper.className = WRAPPER_CLASS;

      // insert wrapper before the img, then move img inside it
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);

      // mark processed so we never touch it again
      img.setAttribute(PROCESSED_FLAG, "wrapped");
      console.log(`✅ Wrapped image into .${WRAPPER_CLASS}:`, img);
      return true;
    } catch (err) {
      console.error("❌ Failed to wrap image:", img, err);
      return false;
    }
  }

  // initial pass: find all images inside .card and wrap if needed
  function initialPass() {
    const imgs = Array.from(document.querySelectorAll(IMAGE_SELECTOR));
    let count = 0;
    imgs.forEach(img => {
      if (wrapImageIfNeeded(img)) count++;
    });
    console.log(`🎯 Initial pass complete — wrapped ${count} images. ✅`);
  }

  // when new nodes are added, check if they contain images we should wrap
  function handleMutations(mutations) {
    let wrapped = 0;
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (!node) return;

        // if a whole subtree was added, search for imgs inside it
        if (node.querySelectorAll) {
          const imgs = node.querySelectorAll(IMAGE_SELECTOR);
          imgs.forEach(img => {
            if (wrapImageIfNeeded(img)) wrapped++;
          });
        }

        // if the added node itself is an img inside a card
        if (node.tagName === "IMG" && node.matches(IMAGE_SELECTOR)) {
          if (wrapImageIfNeeded(node)) wrapped++;
        }
      });
    });

    if (wrapped > 0) {
      console.log(`✨ MutationObserver wrapped ${wrapped} new image(s).`);
    }
  }

  // set up observer for dynamic content
  const observer = new MutationObserver(handleMutations);
  function startObserver() {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    console.log("🛰️ MutationObserver armed — watching for dynamic cards.");
  }

  // Run when DOM is ready (handles scripts that run before DOMContentLoaded)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initialPass();
      startObserver();
    });
  } else {
    initialPass();
    startObserver();
  }

  // safety: expose a manual API if you want to call it from console
  window.MovieImageContainerFixer = {
    wrapAll: initialPass,
    stopWatching: () => {
      observer.disconnect();
      console.log("🛑 MovieImageContainerFixer observer stopped.");
    }
  };

  console.log("🎬 MovieImageContainerFixer online. Good luck, commander! 🚀");

})();

// Select the section
const section = document.querySelector('#Card-hold');

// Select the row inside the section
const row = section.querySelector('.row');

// Make sure the row has the g-4 class for proper spacing
if (!row.classList.contains('g-4')) {
  row.classList.add('g-4');
}

// Also ensure the row has proper Bootstrap classes
if (!row.classList.contains('justify-content-center')) {
  row.classList.add('justify-content-center');
}

console.log('Bootstrap gutter classes added to row:', row.classList.toString());

// Define the new Bootstrap classes to apply
const newClasses = ['col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-2', 'mb-4'];

// Select all card wrappers whose id starts with "card-wrapper-"
const cardWrappers = document.querySelectorAll('[id^="card-wrapper-"]');

cardWrappers.forEach(wrapper => {
    // Remove all existing column and margin classes that match Bootstrap patterns
    wrapper.classList.forEach(cls => {
        if (/^col(-|$)/.test(cls) || cls === 'mb-4') {
            wrapper.classList.remove(cls);
        }
    });

    // Add the new classes
    wrapper.classList.add(...newClasses);
});

console.log('Bootstrap column classes updated for all card wrappers.');



(function() {
    // 1️⃣ Find the old script
    const oldScript = document.querySelector('script[src="../Assets/js/bootstrap.bundle.min.js"]');
    
    if (oldScript) {
        oldScript.remove(); // Remove the old broken local script
        console.log("✅ Old bootstrap.bundle.min.js removed");
    } else {
        console.log("⚠️ Old bootstrap script not found");
    }

    // 2️⃣ Add the new CDN script
    const newScript = document.createElement("script");
    newScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    newScript.async = false; // load in order
    document.body.appendChild(newScript);
    console.log("✅ New bootstrap.bundle.min.js from CDN added");
})();

document.addEventListener("DOMContentLoaded", () => {
  // Select all offcanvas dropdown toggles
  const offcanvasToggles = document.querySelectorAll('.offcanvas .dropdown-toggle');

  offcanvasToggles.forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.preventDefault();
      const parent = toggle.closest('.dropdown');
      const menu = parent.querySelector('.dropdown-menu');

      // Toggle the "show" class
      parent.classList.toggle('show');
      menu.classList.toggle('show');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cast-card-wrapper').forEach(card => {
        if (!card.classList.contains('col-xl-4')) {
            card.classList.add('col-xl-4');
            console.log('✅ Added col-xl-4 to:', card);
        } else {
            console.log('⚠️ Already has col-xl-4:', card);
        }
    });
});

try {
  // Select all .casted-card elements that ALSO have .border-danger
  const dangerCards = document.querySelectorAll('.casted-card.border-danger');

  console.log("Found elements:", dangerCards.length);

  if (dangerCards.length === 0) {
    console.error("❌ No cards found with selector: .casted-card.border-danger");
  } else {
    dangerCards.forEach(card => {
      card.classList.remove('border-danger');
      console.log("✔️ Removed 'border-danger' from:", card);
    });
  }

} catch (err) {
  console.error("❌ Script crashed:", err);
}