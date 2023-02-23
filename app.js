const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input[name=q]');
const overlay = document.querySelector('.overlay');

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
            removeOverlay();
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
                searchUrl = `https://www.crunchyroll.com/search?q=${searchQuery}`;
                break;
            case '!yt':
                searchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
                break;
            case '!r':
                searchUrl = `https://www.reddit.com/search/?q=${searchQuery}`;
                break;
            case '!ai':
                searchUrl = `https://www.perplexity.ai/?q=${searchQuery}`;
                break;
            case '!w':
                searchUrl = `https://en.wikipedia.org/wiki/${searchQuery}`;
                break;
            case '!mal':
                searchUrl = `https://myanimelist.net/search/all?q=${searchQuery}`;
                break;
            case '!an':
                searchUrl = `https://anilist.co/search/anime?search=${searchQuery}`;
                break;
            case '!b':
                searchUrl = `https://www.bing.com/search?q=${searchQuery}`;
                break;
            case '!a':
                searchUrl = `https://www.amazon.in/s?k=${searchQuery}`;
                break;
            case '!tw':
                searchUrl = `https://twitter.com/search?q=${searchQuery}`;
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

function navigateAI() {
    let query = searchInput.value.trim();
    const trimmedQuery = query.replace(/\!ai/g, '');
    window.location.href = `https://www.perplexity.ai/?q=${trimmedQuery}`;
    overlay.style.transition = "opacity 1s ease";
    addOverlay();
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
    addOverlay();
    setTimeout(function () {
        submitSearchForm(); // submit the form after a 0.5s delay
    }, 64);

});

function addOverlay() {
    overlay.style.opacity = 1;
    overlay.style.zIndex = 999;
}

function removeOverlay() {
    overlay.style.opacity = 0;
    overlay.style.zIndex = -1;
}

document.addEventListener("keydown", function (event) {
    var searchInput = document.querySelector("#search-box");
    if (document.activeElement === searchInput) return;

    if (event.code === "Slash") {
        event.preventDefault();
        searchInput.focus();
        searchInput.value = searchInput.value;
        searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    }
});

document.getElementById("search-box").focus();
