window.addEventListener('DOMContentLoaded', function() {

  // Function to handle search
  function handleSearch() {
      var searchInput = document.getElementById('search-input');
      var query = searchInput.value;
      var searchUrl = 'http://cmsc508.com:5000/reptiles/search/' + encodeURIComponent(query); // Adjust port and endpoint as needed

      fetch(searchUrl)
          .then(response => response.json())
          .then(data => {
              displaySearchResults(data);
          })
          .catch(error => console.error('Error fetching search results:', error));
  }

  // Function to display search results
  function displaySearchResults(results) {
      var resultsContainer = document.createElement('div');
      resultsContainer.id = 'search-results';
      document.body.appendChild(resultsContainer);

      results.forEach(result => {
          var resultLink = document.createElement('a');
          resultLink.href = '/species/' + result.id; // Adjust as needed for detailed species page
          resultLink.textContent = result.subspecies_1 + ' ' + result.subspecies_2;
          resultsContainer.appendChild(resultLink);
      });
  }

  var searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', handleSearch);
});