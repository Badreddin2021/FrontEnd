function addFooter() {
    var style = document.createElement('style');
    style.innerHTML = `
        footer {
            background-color: #333; /* Dark background */
            color: #fff; /* White text */
            padding: 20px;
            display: flex; /* Using flexbox for layout */
            justify-content: space-between; /* Space between content and link */
            align-items: center; /* Vertically center align the items */
            font-size: 0.8em; /* Smaller font size */
            padding-left: 50px; /* Padding inside the footer */
            padding-right: 50px;
        }
  
        footer a {
            color: #4da6ff; /* Light blue links for visibility */
            text-decoration: none; /* Removing underline from links */
        }
  
        footer a:hover {
            text-decoration: underline; /* Underline on hover for better user experience */
        }

        footer p {
            margin: auto;
            font-size: 12px;
        }
    `;
    document.head.appendChild(style);

    const footerHTML = `
        <footer>
            <div class="footer-content">
                <p>Copyright © 1995-2018 by Peter Uetz. This database is maintained by Peter Uetz with help from many volunteers.</p>
                <p>You may cite this database as Uetz, P., Freed, P., The Reptile Database, http://www.reptile-database.org, accessed [insert date here] (more...)</p>
            </div>
            <div class="footer-link">
                <a href="#">Legal disclosure</a>
            </div>
        </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

window.addEventListener('DOMContentLoaded', function () {
    // Handling the popup display and close functionality
    const advSearchBtn = document.getElementById('adv-search-btn');
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.close-btn');

    if (advSearchBtn) {
        advSearchBtn.addEventListener('click', function() {
            popup.style.display = 'block'; // Show the popup
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            popup.style.display = 'none'; // Hide the popup
        });
    }

    // Advanced Search Form submission
    const advSearchForm = document.getElementById('adv-search-form');
    if (advSearchForm) {
        advSearchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            const formData = new FormData(advSearchForm);
            const searchParams = new URLSearchParams();

            for (let [key, value] of formData.entries()) {
                if (value.trim() !== '') {
                    searchParams.append(key, value.trim());
                }
            }

            // Redirect to search results page with query parameters
            window.location.href = `searchresultadvanced.html?${searchParams.toString()}`;
        });
    }

    // Add event listeners for basic search
    const basicSearchInput = document.getElementById('search-input');
    if (basicSearchInput) {
        basicSearchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent the form from being submitted
                initiateBasicSearch();
            }
        });
    }

    const basicSearchBtn = document.getElementById('search-btn');
    if (basicSearchBtn) {
        basicSearchBtn.addEventListener('click', initiateBasicSearch);
    }

    function initiateBasicSearch() {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `searchresult.html?query=${encodeURIComponent(query)}`;
        }
    }

    // Bind click events to taxa links
    const taxaLinks = document.querySelectorAll('a[data-taxa]');
    taxaLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            const taxa = this.getAttribute('data-taxa');
            window.location.href = `searchresulttaxa.html?taxa=${encodeURIComponent(taxa)}`;
        });
    });
});
