(function waitForjQuery() {
  if (typeof jQuery === 'undefined') {
    console.log('⏳ Waiting for jQuery...');
    setTimeout(waitForjQuery, 50);
    return;
  }

  $(document).ready(function () {
    console.log('✅ jQuery loaded, running Season/Episode script...');

    // Ensure iframe exists and has the correct ID
    let $iframe = $('iframe#show-episode');
    if (!$iframe.length) {
      $iframe = $('iframe').first();
      if (!$iframe.length) {
        console.warn('❌ No iframe found on the page.');
        return;
      }
      $iframe.attr('id', 'show-episode');
    }

    // Append class Episodes to all season sections dynamically
    $("section[id='Episodes']").each(function () {
      $(this).addClass('Episodes');
    });

    let allSeasons = $("section.Episodes");
    let totalSeasons = allSeasons.length;

    // Hide all seasons initially
    allSeasons.hide();

    // Show Season 1 by default
    let seasonOne = $("section.Episodes[data-season='1']");
    seasonOne.show();

    // Load first episode of Season 1 automatically
    let firstEp = seasonOne.find(".custom-ep-btn").first();
    if (firstEp.length > 0) {
      let defaultSrc = firstEp.data('src');
      $iframe.attr('src', defaultSrc);
      showToast('success', 'Season 1 - Episode 1 Loaded');
    }

    // Handle season selector change
    $('#season-selector').on('change', function () {
      let selectedSeason = $(this).val();
      allSeasons.hide(); // hide all other seasons
      let currentSection = $(`section.Episodes[data-season='${selectedSeason}']`);
      currentSection.show();

      // Load first episode of selected season
      let firstEpisode = currentSection.find(".custom-ep-btn").first();
      if (firstEpisode.length > 0) {
        let episodeSrc = firstEpisode.data('src');
        $iframe.attr('src', episodeSrc);
        showToast('success', `Season ${selectedSeason} - Episode 1 Loaded`);
      } else {
        showToast('warning', `No episodes found for Season ${selectedSeason}`);
      }
    });

    // Episode button click event
    $(document).on('click', 'section.Episodes button.custom-ep-btn', function () {
      let $btn = $(this);
      let season = $btn.closest('section.Episodes').data('season');
      let epNumber = $btn.text().trim();
      let src = $btn.data('src');
      $iframe.attr('src', src);
      showToast('success', `Season ${season} - ${epNumber} is now playing`);
    });

    // Toast notification function
    function showToast(type, message) {
      let toastClass = type === 'success' ? 'bg-success' : 'bg-warning text-dark';
      let toast = $(`
        <div class="toast align-items-center ${toastClass} border-0 position-fixed bottom-0 end-0 m-3" 
             role="alert" aria-live="assertive" aria-atomic="true" style="z-index:9999;">
          <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                    data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      `);
      $('body').append(toast);
      let bsToast = new bootstrap.Toast(toast[0]);
      bsToast.show();
      setTimeout(() => toast.remove(), 4000);
    }
  });
})();
