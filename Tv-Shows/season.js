(function waitForjQuery() {
  if (typeof jQuery === 'undefined') {
    console.log('⏳ Waiting for jQuery...');
    return setTimeout(waitForjQuery, 50);
  }

  $(function () {
    console.log('✅ jQuery loaded, running Season/Episode script...');

    // 🔑 Create page-specific storage keys
    const PAGE_ID = window.location.pathname;

    const STORAGE_KEYS = {
      season: `selectedSeason_${PAGE_ID}`,
      episode: `selectedEpisodeSrc_${PAGE_ID}`
    };

    // Ensure iframe exists
    let $iframe = $('#show-episode');
    if (!$iframe.length) {
      $iframe = $('iframe').first();
      if (!$iframe.length) {
        console.warn('❌ No iframe found.');
        return;
      }
      $iframe.attr('id', 'show-episode');
    }

    // Normalize season sections
    $("section[id='Episodes']").addClass('Episodes');
    const $allSeasons = $("section.Episodes");

    if (!$allSeasons.length) {
      console.warn('❌ No seasons found.');
      return;
    }

    $allSeasons.hide();

    // Restore saved state for THIS series page
    let savedSeason = localStorage.getItem(STORAGE_KEYS.season);
    let savedEpisode = localStorage.getItem(STORAGE_KEYS.episode);

    if (!savedSeason) {
      savedSeason = '1';
    }

    let $activeSection = $(`section.Episodes[data-season='${savedSeason}']`);

    if (!$activeSection.length) {
      savedSeason = '1';
      $activeSection = $("section.Episodes[data-season='1']");
    }

    $activeSection.show();
    $('#season-selector').val(savedSeason);

    // Load episode
    if (savedEpisode) {
      $iframe.attr('src', savedEpisode);
    } else {
      let $firstEp = $activeSection.find('.custom-ep-btn').first();
      if ($firstEp.length) {
        let defaultSrc = $firstEp.data('src');
        $iframe.attr('src', defaultSrc);
        localStorage.setItem(STORAGE_KEYS.episode, defaultSrc);
      }
    }

    // Season Change
    $('#season-selector').off('change').on('change', function () {
      let selectedSeason = $(this).val();
      let $section = $(`section.Episodes[data-season='${selectedSeason}']`);

      if (!$section.length) return;

      $allSeasons.hide();
      $section.show();

      localStorage.setItem(STORAGE_KEYS.season, selectedSeason);

      let $firstEpisode = $section.find('.custom-ep-btn').first();

      if ($firstEpisode.length) {
        let src = $firstEpisode.data('src');

        $iframe.attr('src', src);
        localStorage.setItem(STORAGE_KEYS.episode, src);

        showToast('success', `Season ${selectedSeason} - Episode 1 Loaded`);
      }
    });

    // Episode Click
    $(document).off('click', 'section.Episodes button.custom-ep-btn')
      .on('click', 'section.Episodes button.custom-ep-btn', function () {

        let $btn = $(this);
        let season = $btn.closest('section.Episodes').data('season');
        let epNumber = $btn.text().trim();
        let src = $btn.data('src');

        $iframe.attr('src', src);

        localStorage.setItem(STORAGE_KEYS.season, season);
        localStorage.setItem(STORAGE_KEYS.episode, src);

        showToast('success', `Season ${season} - ${epNumber} is now playing`);
      });

    // Toast
    function showToast(type, message) {

      let toastClass = type === 'success'
        ? 'bg-success'
        : 'bg-warning text-dark';

      let toast = $(`
        <div class="toast align-items-center ${toastClass} border-0 position-fixed bottom-0 end-0 m-3"
             role="alert" aria-live="assertive" aria-atomic="true"
             style="z-index:9999;">
          <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button"
                    class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast"
                    aria-label="Close"></button>
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