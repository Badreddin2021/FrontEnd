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


document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const apiUrl = `http://cmsc508.com:5000/reptiles/search/advanced?${params}`;
    const container = document.getElementById('results-container');
    container.innerHTML = ''; // Clear previous results
      // Display the searching message
        container.innerHTML = '<p><b>Searching...</b></p>';
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => {
            console.error('Error:', error);
            displayError();
        });

    function displayResults(results) {
        
          // Check if results are empty or undefined and display a message if so
        container.innerHTML = ' ';

        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'result';

            const resultLink = document.createElement('a');
            resultLink.href = `reptile_page.html?reptile_id=${result.id}`; // Assuming 'id' is the unique identifier for each reptile
            resultLink.innerHTML = `
                <h2>${result.subspecies_1} ${result.subspecies_2} (${result.subspecies_finder}, ${result.subspecies_year})</h2>
                <p>Common names: ${result.common_names.join(', ')}</p>
    
            `;
            resultElement.appendChild(resultLink);
            container.appendChild(resultElement);
        });
	addFooter();
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