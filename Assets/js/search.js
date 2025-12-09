let allItemsModal = [];
const searchInputModal = document.getElementById("searchInputModal");
const searchResultsModal = document.getElementById("searchResultsModal");
const searchBtnModal = document.getElementById("searchBtnModal");
const yearFilterModal = document.getElementById("yearFilterModal");
const categoryFilterModal = document.getElementById("categoryFilterModal");
const autocompleteListModal = document.getElementById("autocompleteListModal");

// Load search data from database
function loadSearchDataModal() {
    if (allItemsModal.length === 0) {
        $.ajax({
            url: "https://flickrift-88d83-default-rtdb.firebaseio.com/search.json",
            method: "GET",
            dataType: "json",
            success: function(data) {
                const normalize = (arr) => Array.isArray(arr) ? arr.filter(e => e && e.title).map(e => ({
                    title: e.title,
                    year: e.year || e.Year || "Unknown",
                    category: e.category || e.Category || "Misc",
                    url: e.url || e.Url || "#",
                    image: e.image_poster
                })) : [];

                allItemsModal = [...normalize(data.movies), ...normalize(data.tvshows)];
                populateFiltersModal();
                displayResultsModal(allItemsModal);
            },
            error: function(xhr, status, error) {
                console.error("Error loading search data:", error);
            }
        });
    }
}

// Populate filters
function populateFiltersModal() {
    const years = [...new Set(allItemsModal.map(i => i.year))].sort((a,b) => b-a);
    const categories = [...new Set(allItemsModal.map(i => i.category))].sort();

    years.forEach(y => yearFilterModal.innerHTML += `<option value="${y}">${y}</option>`);
    categories.forEach(c => categoryFilterModal.innerHTML += `<option value="${c}">${c}</option>`);
}

// Display search results (poster left, title/details right)
function displayResultsModal(items) {
    searchResultsModal.innerHTML = "";
    if(items.length === 0){
        searchResultsModal.innerHTML = `<p class="text-center text-muted">No results found.</p>`;
        return;
    }

    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "search-item d-flex align-items-center p-2 rounded mb-2";
        div.style.cursor = "pointer";
        div.style.backgroundColor = "#2a2a2a";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="img-thumbnail" style="width: 80px; height: 120px; object-fit: cover; margin-right: 15px;">
            <div class="details flex-grow-1">
                <div class="title fw-bold">${item.title}</div>
                <div class="meta text-muted">${item.year} | ${item.category}</div>
            </div>
        `;
        div.addEventListener("click", () => window.open(item.url, "_blank"));
        searchResultsModal.appendChild(div);
    });
}

// Search & filter items
function searchItemsModal() {
    const term = searchInputModal.value.toLowerCase().trim();
    const year = yearFilterModal.value;
    const category = categoryFilterModal.value;

    const filtered = allItemsModal.filter(item =>
        item.title.toLowerCase().includes(term) &&
        (year ? item.year === year : true) &&
        (category ? item.category === category : true)
    );

    displayResultsModal(filtered);
    updateAutocompleteModal(term);
}

// Autocomplete suggestions
function updateAutocompleteModal(term) {
    autocompleteListModal.innerHTML = "";
    if(!term) return;

    const suggestions = allItemsModal
        .filter(i => i.title.toLowerCase().startsWith(term))
        .slice(0, 7);

    suggestions.forEach(item => {
        const div = document.createElement("div");
        div.className = "list-group-item";
        div.textContent = item.title;
        div.addEventListener("click", () => {
            searchInputModal.value = item.title;
            searchItemsModal();
            autocompleteListModal.innerHTML = "";
        });
        autocompleteListModal.appendChild(div);
    });
}

// Event listeners
searchBtnModal.addEventListener("click", searchItemsModal);
searchInputModal.addEventListener("input", () => searchItemsModal());
searchInputModal.addEventListener("keydown", e => { if(e.key === "Enter") searchItemsModal(); });
yearFilterModal.addEventListener("change", searchItemsModal);
categoryFilterModal.addEventListener("change", searchItemsModal);

// Load data when modal is opened
$('#searchModal').on('show.bs.modal', loadSearchDataModal);
