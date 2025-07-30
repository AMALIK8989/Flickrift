$(document).ready(function () {
  $("section[id^='Episodes']").hide();
  $("section[data-season='1']").show();

  let defaultSrc = $("section[data-season='1'] .custom-ep-btn").first().data('src');
  $('#show-episode').attr('src', defaultSrc);
  showToast('success', 'Season 1 - Episode 1 Loaded');
  console.log('Loaded: Season 1 - Episode 1');

  $('#season-selector').on('change', function () {
    let selectedSeason = $(this).val();
    $("section[id^='Episodes']").hide();
    let currentSection = $(`section[data-season='${selectedSeason}']`);
    currentSection.show();
    let firstEpisode = currentSection.find(".custom-ep-btn").first();

    if (firstEpisode.length > 0) {
      let episodeOneSrc = firstEpisode.data('src');
      $('#show-episode').attr('src', episodeOneSrc);
      showToast('success', `Season ${selectedSeason} - Episode 1 Loaded`);
      console.log(`Loaded: Season ${selectedSeason} - Episode 1`);
    } else {
      showToast('warning', `No episodes found for Season ${selectedSeason}`);
      console.warn(`Warning: No episodes found for Season ${selectedSeason}`);
    }
  });

  $('.custom-ep-btn').on('click', function () {
    let src = $(this).data('src');
    let epText = $(this).text();
    $('#show-episode').attr('src', src);
    showToast('success', `${epText} is now playing`);
    console.log(`User selected: ${epText}`);
  });

  function showToast(type, message) {
    let toastClass = type === 'success' ? 'bg-success' : 'bg-warning text-dark';
    let toast = $(`
      <div class="toast align-items-center ${toastClass} border-0 position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true" style="z-index:9999;">
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `);
    $('body').append(toast);
    let bsToast = new bootstrap.Toast(toast[0]);
    bsToast.show();
    setTimeout(() => toast.remove(), 4000);
  }
});
