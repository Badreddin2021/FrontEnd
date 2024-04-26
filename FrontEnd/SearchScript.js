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

window.addEventListener('DOMContentLoaded', function() {
    var resultsContainer = document.getElementById('search-results') || document.createElement('div');
        resultsContainer.id = 'search-results';
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
  
    }

    function fetchSearchResults(query) {
       
        document.body.appendChild(resultsContainer);

        // Display the searching message
        resultsContainer.innerHTML = '<p>Searching...</p>';

        fetch(`http://127.0.0.1:5000/reptiles/search/${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data);
            })
            .catch(error => {
            console.error('Error:', error);
            displayError();
        });
    }

 // Function to display search results
function displaySearchResults(results) {
    resultsContainer.innerHTML = ' ';
    document.body.appendChild(resultsContainer);

    results.forEach(result => {
        var resultLink = document.createElement('a');
        resultLink.href = `reptile_page.html?reptile_id=${result.id}`;
        resultLink.innerHTML = result.subspecies_1+ ' ' + result.subspecies_2+'('+result.subspecies_finder+','+result.subspecies_year+')'+'<br>';
        resultsContainer.appendChild(resultLink);
    });
addFooter();
}


    // Extract the search query from the URL
    var query = getQueryVariable('query');
    if (query) {
        fetchSearchResults(query);
    }

});
function displayError() {
    var resultsContainer = document.getElementById('search-results') || document.createElement('div');
    if (!document.getElementById('search-results')) {
        resultsContainer.id = 'search-results';
        document.body.appendChild(resultsContainer);
    }
    resultsContainer.innerHTML = `<p><b>No Results Found for the searched item </b></p>`;
}
