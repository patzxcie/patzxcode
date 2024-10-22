document.addEventListener("DOMContentLoaded", function(event) {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    let isNavMenuVisible = true;

    hamburger.addEventListener("click", () => { 
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        isNavMenuVisible = !isNavMenuVisible;
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        isNavMenuVisible = true;
    }));
});





const animeData = [
    {
        title: "One Piece",
        genre: "Adventure",
        country: "Japan",
        season: "Ongoing",
        type: "TV Series",
        image: "images/onepiece.jpg",
        status: "On-going",
        featured: true
    },
    {
        title: "Jujutsu Kaisen",
        genre: "Action",
        country: "Japan",
        season: "Fall",
        type: "TV Series",
        image: "images/jujutsu.jpg",
        status: "Completed",
        featured: false
    },
    {
        title: "My Hero Academia",
        genre: "Action",
        country: "Japan",
        season: "Ongoing",
        type: "TV Series",
        image: "images/myheroacademia.jpg",
        status: "On-going",
        featured: false
    },
    {
        title: "Naruto",
        genre: "Action",
        country: "Japan",
        season: "Completed",
        type: "TV Series",
        image: "images/naruto.jpg",
        status: "Completed",
        featured: true
    },
    {
        title: "The Ossan Newbie Adventurer Trained to Death by the Most Powerful Party, Became Invincible",
        genre: "Action, Adventure, Comedy, Fantasy",
        country: "Japan",
        season: "Ongoing",
        type: "TV Series",
        image: "images/ossan.png",
        status: "On-going",
        featured: false
    },
    {
        title: "Tower of God Season 2",
        genre: "Action, Adventure, Comedy, Fantasy",
        country: "Korea",
        season: "Ongoing",
        type: "TV Series",
        image: "images/towerofgod.png",
        status: "On-going",
        featured: false
    },
    {
        title: "A Journey Through Another World: Raising Kids While Adventuring",
        genre: "Action, Adventure, Comedy, Fantasy",
        country: "Japan",
        season: "Ongoing",
        type: "TV Series",
        image: "images/ajourney.png",
        status: "On-going",
        featured: false
    },
    {
        title: "VTuber Legend: How I Went Viral after Forgetting to Turn Off My Stream",
        genre: "Comedy, Slice of Life",
        country: "Japan",
        season: "Ongoing",
        type: "TV Series",
        image: "images/vtuber.png",
        status: "On-going",
        featured: false
    }
];

// Function to display featured anime
function displayFeaturedAnime() {
    const featuredAnimeContainer = document.querySelector('.featured-anime');
    featuredAnimeContainer.innerHTML = '';

    const featuredAnime = animeData.filter(anime => anime.featured);

    featuredAnime.forEach(anime => {
        const animeItem = document.createElement('div');
        animeItem.classList.add('anime-item');
        animeItem.innerHTML = `
            <img alt="${anime.title}" src="${anime.image}" style="width: 288px; height: 479px;"/>
            <div class="info">
                <h3>${anime.title}</h3>
                <p>${anime.season} (${anime.status})</p>
            </div>
        `;
        featuredAnimeContainer.appendChild(animeItem);
    });
}

// Function to display recently updated anime
function displayRecentlyUpdatedAnime() {
    const recentlyUpdatedContainer = document.querySelector('.recently-updated');
    recentlyUpdatedContainer.innerHTML = '';

    const recentlyUpdatedAnime = animeData.slice(-4); // Get the last 4 anime

    recentlyUpdatedAnime.forEach(anime => {
        const animeItem = document.createElement('div');
        animeItem.classList.add('anime-item');
        animeItem.innerHTML = `
            <img alt="${anime.title}" src="${anime.image}" style="width: 288px; height: 479px;"/>
            <div class="info">
                <h3>${anime.title}</h3>
                <p>${anime.season} (${anime.status})</p>
            </div>
        `;
        recentlyUpdatedContainer.appendChild(animeItem);
    });
}

// Function to display the anime items based on filters
function displayAnime(filteredAnime) {
    const animeListContainer = document.querySelector('.anime-list');
    animeListContainer.innerHTML = '';

    if (filteredAnime.length === 0) {
        // Show message if no results found
        const noResultsMessage = document.createElement('div');
        noResultsMessage.classList.add('no-results');
        noResultsMessage.innerText = 'No Results Found';
        animeListContainer.appendChild(noResultsMessage);
    } else {
        filteredAnime.forEach(anime => {
            const animeItem = document.createElement('div');
            animeItem.classList.add('anime-item');
            animeItem.innerHTML = `
                <img alt="${anime.title}" src="${anime.image}" style="width: 288px; height: 479px;"/>
                <div class="info">
                    <h3>${anime.title}</h3>
                    <p>${anime.season} (${anime.status})</p>
                </div>
            `;
            animeListContainer.appendChild(animeItem);
        });
    }
}

// Function to filter anime based on selected options and search term
function filterAnime() {
    const genreSelect = document.querySelector('select[name="genre"]');
    const countrySelect = document.querySelector('select[name="country"]');
    const seasonSelect = document.querySelector('select[name="season"]');
    const typeSelect = document.querySelector('select[name="type"]');
    const statusSelect = document.querySelector('select[name="status"]');
    const searchInput = document.querySelector('input[type="text"]');

    const filterOptions = {
        genre: genreSelect.value,
        country: countrySelect.value,
        season: seasonSelect.value,
        type: typeSelect.value,
        status: statusSelect.value
    };

    const searchTerm = searchInput.value.toLowerCase();

    const filteredAnime = animeData.filter(anime => {
        // Check if the anime matches the filters
        const matchesGenre = filterOptions.genre === "All" || anime.genre.includes(filterOptions.genre);
        const matchesCountry = filterOptions.country === "All" || anime.country === filterOptions.country;
        const matchesSeason = filterOptions.season === "All" || anime.season === filterOptions.season;
        const matchesType = filterOptions.type === "All" || anime.type === filterOptions.type;
        const matchesStatus = filterOptions.status === "All" || anime.status === filterOptions.status;
        const matchesSearch = anime.title.toLowerCase().includes(searchTerm);

        return matchesGenre && matchesCountry && matchesSeason && matchesType && matchesStatus && matchesSearch;
    });

    displayAnime(filteredAnime);
}

// Function to handle the search input
function handleSearch(event) {
    if (event.key === 'Enter') { // Trigger search only on Enter key
        filterAnime(); // Call the filter function to update the displayed anime
    }
}

// Add event listeners to the dropdowns and search input
const genreSelect = document.querySelector('select[name="genre"]');
const countrySelect = document.querySelector('select[name="country"]');
const seasonSelect = document.querySelector('select[name="season"]');
const typeSelect = document.querySelector('select[name="type"]');
const statusSelect = document.querySelector('select[name="status"]');
const searchInput = document.querySelector('input[type="text"]');

// Event listeners for dropdown filters
genreSelect.addEventListener('change', filterAnime);
countrySelect.addEventListener('change', filterAnime);
seasonSelect.addEventListener('change', filterAnime);
typeSelect.addEventListener('change', filterAnime);
statusSelect.addEventListener('change', filterAnime);
searchInput.addEventListener('keypress', handleSearch); // Only filter on Enter key

// Initial display of anime items
displayFeaturedAnime();
displayRecentlyUpdatedAnime();
displayAnime(animeData); // Display all anime initially





  

