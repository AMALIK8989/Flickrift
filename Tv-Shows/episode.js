$(document).ready(function () {
  try {
    // Ensure the iframe exists and has the correct ID
    let $iframe = $('iframe#show-episode');
    if (!$iframe.length) {
      $iframe = $('iframe').first(); // fallback to first iframe if ID not present
      if (!$iframe.length) {
        console.warn('❌ No iframe found on the page.');
        return;
      }
      $iframe.attr('id', 'show-episode'); // assign ID dynamically
    }

    // --- Auto-clear after 45 minutes (2700000 ms) ---
    const EXPIRY_KEY = 'episodeSrcExpiry';
    const now = Date.now();

    // Clear if expired
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (expiry && now > parseInt(expiry)) {
      localStorage.removeItem('selectedEpisodeSrc');
      localStorage.removeItem(EXPIRY_KEY);
    }

    // Load saved episode from localStorage
    const savedSrc = localStorage.getItem('selectedEpisodeSrc');
    if (savedSrc) {
      $iframe.attr('src', savedSrc).attr('loading', 'lazy');
    }

    // Event delegation for all episode buttons
    $(document).on('click', 'section#Episodes button.custom-ep-btn', function () {
      try {
        const $btn = $(this);
        const season = $btn.closest('section#Episodes').data('season'); // get season
        const epNumber = $btn.text().trim(); // episode number (like "Episode 1")
        const newSrc = $btn.data('src');

        if (!newSrc) throw new Error('No video source provided');

        const currentSrc = $iframe.attr('src');
        if (newSrc === currentSrc) {
          showToast(`ℹ️ Season ${season} ${epNumber} is already playing`);
          return;
        }

        // Store new source and expiry
        localStorage.setItem('selectedEpisodeSrc', newSrc);
        localStorage.setItem(EXPIRY_KEY, Date.now() + 45 * 60 * 1000); // 45 minutes

        // Load video with fade effect
        $iframe.addClass('opacity-50');
        $iframe.attr('src', '');
        setTimeout(() => {
          $iframe.attr('src', newSrc);
          $iframe.removeClass('opacity-50');
          showToast(`✅ Season ${season} ${epNumber} loaded successfully`);
        }, 100);

      } catch (err) {
        console.error('🎬 Button click error:', err);
        showToast(`❌ Error: ${err.message}`, true);
      }
    });

    // --- Clear on tab close or refresh ---
    $(window).on('beforeunload unload', () => {
      localStorage.removeItem('selectedEpisodeSrc');
      localStorage.removeItem(EXPIRY_KEY);
    });

  } catch (err) {
    console.error('🔥 Script Init Error:', err);
    showToast(`❌ Init error: ${err.message}`, true);
  }

  // Toast Notification
  function showToast(message, isError = false) {
    const toastId = `toast-${Date.now()}`;
    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center text-white ${isError ? 'bg-danger' : 'bg-success'} border-0 position-fixed bottom-0 end-0 m-4"
        role="alert" aria-live="${isError ? 'assertive' : 'polite'}" aria-atomic="true" style="z-index: 9999;">
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
    $('body').append(toastHtml);
    const toast = new bootstrap.Toast(document.getElementById(toastId), { delay: 3000 });
    toast.show();
    setTimeout(() => { $(`#${toastId}`).remove(); }, 3500);
  }
});
