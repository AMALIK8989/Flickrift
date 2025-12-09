/*******************************
 * REMOVE OLD HEADER & INSERT NEW NAVBAR
 *******************************/
document.addEventListener("DOMContentLoaded", function () {

  // 1️⃣ Remove the first <header> completely (old one)
  const oldHeader = document.querySelector("header");
  if (oldHeader) oldHeader.remove();

  // 2️⃣ Calculate folder depth for dynamic paths
  const depth = location.pathname.split("/").length - 2;
  let prefix = "";
  for (let i = 0; i < depth; i++) prefix += "../";

  // 3️⃣ Prevent duplicates
  if (document.getElementById("nav-header")) return;

  // 4️⃣ Generate genre links dynamically
  function generateLinks() {
    const pages = [
      "Action", "Comedy", "Drama", "Horror", "Adventure",
      "Romance", "Kids", "Thriller", "Documentry",
      "Animated", "Indie", "Tv-shows"
    ];
    return pages.map(p => `<li><a class="dropdown-item" href="${prefix}${p}.html">${p.replace("-", " ")}</a></li>`).join("");
  }

  // 5️⃣ Mobile offcanvas menu template
  function mobileMenu() {
    return `
    <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileMenu">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Menu</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#searchModal">
              <i class="bi bi-search"></i> Search
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
              Genres
            </a>
            <ul class="dropdown-menu">${generateLinks()}</ul>
          </li>
        </ul>
      </div>
    </div>`;
  }

  // 6️⃣ Construct new navbar
  const navHTML = `
<header id="nav-header">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">

      <a class="navbar-brand" href="#">
        <img src="${prefix}Assets/Logo.webp" alt="Logo" class="img-logo">
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#searchModal">
              <i class="bi bi-search"></i> Search
            </a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
              Genres
            </a>
            <ul class="dropdown-menu">${generateLinks()}</ul>
          </li>
        </ul>
      </div>

    </div>
  </nav>
  ${mobileMenu()}
</header>`;

  // 7️⃣ Insert the new navbar at the top of <body>
  document.body.insertAdjacentHTML("afterbegin", navHTML);

});
