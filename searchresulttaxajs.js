document.addEventListener('DOMContentLoaded', function() {
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



    const params = new URLSearchParams(window.location.search);
    const taxa = params.get('taxa');
    const resultsContainer = document.getElementById('search-results') || document.createElement('div');
    resultsContainer.id = 'search-results';
    document.body.appendChild(resultsContainer);

    if (!taxa) {
        resultsContainer.innerHTML = '<p>No taxa specified for the search.</p>';
        return; // Exit if no taxa is provided
    }

    // Display the searching message
    resultsContainer.innerHTML = '<p><b>Searching...</b></p>';

    const apiUrl = `http://cmsc508.com:5000/reptiles/search/taxa/${encodeURIComponent(taxa)}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displaySearchResults(data))
        .catch(error => {
            console.error('Error fetching search results:', error);
            resultsContainer.innerHTML = '<p><b>No Results Found for the searched item .</b></p>';
        });

    function displaySearchResults(results) {
        resultsContainer.innerHTML = ''; // Clear the "Searching..." message

        if (!results || results.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        results.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';

            const resultLink = document.createElement('a');
            resultLink.href = `reptile_page.html?reptile_id=${result.id}`;
            resultLink.innerHTML = `
                <h2>${result.subspecies_1 || ''} ${result.subspecies_2 || ''} (${result.subspecies_finder || 'Unknown'}, ${result.subspecies_year || 'Unknown'})</h2>
                <p>Common names: ${result.common_names ? result.common_names.join(', ') : 'None provided'}</p>
            `;
            resultDiv.appendChild(resultLink);
            resultsContainer.appendChild(resultDiv);
        });
	    addFooter(); 
    }
});
