// 🕵️‍♂️ Logo Detective: Tracks down your logo no matter how deep in the folder jungle you are.
(function($) {
  // Make sure jQuery is available
  if (typeof $ === 'undefined') {
    console.error("Logo Detective: jQuery is not loaded. Script cannot function.");
    return;
  }

  const LOGO_SELECTOR = ".navbar-brand .img-logo";
  const LOGO_FILE = "Logo.webp"; // Just the filename, not the full path

  // 🎯 Step 1: Try to fix any incorrect or missing logos right away
  function initialInvestigation() {
    let fixed = 0;
    
    $(LOGO_SELECTOR).each(function() {
      if (fixLogoIfNeeded(this)) fixed++;
    });

    console.log(`🕶️ Initial investigation complete — corrected ${fixed} logo(s).`);
  }

  // 🛠️ Inspector's tool: checks and repairs logo paths
  function fixLogoIfNeeded(img) {
    if (!img) return false;

    // Debugging information
    console.log("Current logo src:", img.src);
    console.log("Current pathname:", window.location.pathname);

    // Get just the filename from the current src
    const currentSrc = img.src;
    const urlParts = currentSrc.split('/');
    const currentFileName = urlParts[urlParts.length - 1];
    
    // 😌 Already correct? No touching.
    if (currentFileName === LOGO_FILE) {
      console.log("Logo is already correct, no changes needed");
      return false;
    }

    // 🧮 Calculate depth and build proper path
    const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '');
    const depth = pathSegments.length - 1; // Adjusted calculation
    const newPath = (depth > 0 ? "../".repeat(depth) : "./") + "Assets/" + LOGO_FILE;
    
    // Debugging information
    console.log("Calculated depth:", depth);
    console.log("Calculated new path:", newPath);

    img.src = newPath;
    console.log("Logo path updated successfully");
    return true;
  }

  // 🔎 Step 2: Watch for newly added logos
  function handleMutations(mutations) {
    let fixed = 0;

    mutations.forEach(m => {
      $(m.addedNodes).each(function() {
        const node = this;
        
        // If it's a subtree, check inside for logos
        if (node.nodeType === Node.ELEMENT_NODE) {
          $(node).find(LOGO_SELECTOR).each(function() {
            if (fixLogoIfNeeded(this)) fixed++;
          });
          
          // If the node itself *is* a logo
          if (node.tagName === "IMG" && $(node).is(LOGO_SELECTOR)) {
            if (fixLogoIfNeeded(node)) fixed++;
          }
        }
      });
    });

    if (fixed > 0) {
      console.log(`🕵️‍♀️ Mutation Observer fixed ${fixed} new suspicious logo(s).`);
    }
  }

  // 📡 Watch the DOM for new content
  const observer = new MutationObserver(handleMutations);
  function activateWatcher() {
    observer.observe(document.body, { childList: true, subtree: true });
    console.log("🚨 Logo Detective on duty — scanning for missing logos...");
  }

  // 🚀 Deploy when DOM is ready
  $(document).ready(function() {
    initialInvestigation();
    activateWatcher();
  });

  // 🧠 Optional tools
  window.LogoDetective = {
    scanNow: initialInvestigation,
    retire: () => {
      observer.disconnect();
      console.log("🛑 Logo Detective retired. Case closed.");
    }
  };

  console.log("🕵️‍♂️ Logo Detective is online. Let the hunt begin! 🔍💼");

})(jQuery);