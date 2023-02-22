// Get the flower icon element
const flowerIcon = document.querySelector('.bi-flower3');

// Add the 'rotate' class to the flower icon element
flowerIcon.classList.add('rotate');

const imageUrl = "https://source.unsplash.com/random/1920x1080/?iris%20flower";
const bgElement = document.getElementsByClassName("bg-image")[0];
let preloaderImg = document.createElement("img");
preloaderImg.src = imageUrl;
preloaderImg.addEventListener('load', (event) => {
    bgElement.style.backgroundImage = `url(${imageUrl})`;
    bgElement.classList.add('opacity');
    preloaderImg = null;
    flowerIcon.classList.add('stop');
});

// SEARCH LOGIC:

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input[name=q]');

function submitSearchForm() {
    let searchUrl = 'https://www.bing.com/search?q=';
    let query = searchInput.value.trim();
    let words = query.split(' ');

    // Check if any of the words starts with a bang
    let bangs = words.filter((word) => word.startsWith('!'));

    if (bangs.length > 0) {
        // Check if all the bangs are the same
        let sameBangs = bangs.every((bang) => bang === bangs[0]);

        if (!sameBangs) {
            // Show error message to user
            alert('More than one type of bang found in search query!');
            return;
        }

        let bang = bangs[0];
        let searchQuery = words.filter((word) => !word.startsWith('!')).join(' ');

        switch (bang) {
            case '!g':
                searchUrl = `https://www.google.com/search?q=${searchQuery}`;
                break;
            case '!e':
                searchUrl = `https://www.ecosia.org/search?q=${searchQuery}`;
                break;
            case '!ddg':
                searchUrl = `https://duckduckgo.com/?q=${searchQuery}`;
                break;
            case '!nf':
                searchUrl = `https://www.netflix.com/search?q=${searchQuery}`;
                break;
            case '!cr':
                searchUrl = `https://www.crunchyroll.com/search?from=&q=${searchQuery}`;
                break;
            case '!yt':
                searchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
                break;
            case '!rd':
                searchUrl = `https://www.reddit.com/search/?q=${searchQuery}`;
                break;
            // Add more bangs as needed
            default:
                // Show error message to user
                searchUrl += encodeURIComponent(query);
                break;
        }
    } else {
        searchUrl += encodeURIComponent(query);
    }

    window.location.href = searchUrl;
}

// Check if a query parameter is present in the URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');
if (query) {
    searchInput.value = query;
    submitSearchForm();
}

// Add event listener to the search form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitSearchForm();
});

document.getElementById("search-box").focus();
