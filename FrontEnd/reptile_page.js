
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

document.addEventListener('DOMContentLoaded', function() {
    // Function to extract query parameters from URL
    function getQueryParam(param) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
                addFooter();
	function formatListWithBreaks(items) {
  	return items.join('<br>');
	}

    // Function to fetch and display reptile details
    function fetchReptileDetails(reptileId) {
        fetch(`http://localhost:5000/reptiles/${reptileId}`)
            .then(response => response.json())
            .then(data => {
                // Update the page content with the reptile details
                document.querySelector('h1').textContent = data.subspecies_1 + ' ' + data.subspecies_2; // Example for setting reptile name
	document.getElementById('higher-taxa').textContent = data.taxa || 'No Information';
            	document.getElementById('subspecies').textContent = `${data.subspecies_1} ${data.subspecies_2}`;
            	//document.getElementById('common-names').textContent = data.common_names.join(',') || 'No Information';
	document.getElementById('common-names').innerHTML = data.common_names.join('<br>') || 'No Information';
            	document.getElementById('synonym').innerHTML = data.synonyms.join('<br> ') || 'No Information';
           	document.getElementById('distribution').innerHTML = data.distributions.join('<br> ') || 'No Information';
           	document.getElementById('reproduction').textContent = data.reproduction || 'No Information';
	document.getElementById('specimens').innerHTML = data.specimens.join('<br>') || 'No Information';
           	document.getElementById('subspecies_finder').textContent = data.subspecies_finder || 'No Information';
	document.getElementById('subspecies_year').textContent = data.subspecies_year || 'No Information';
               // document.getElementById('iucn').textContent = data.IUCN || 'No Information';

	const diagnosesElement = document.getElementById('diagnoses');
    	if (diagnosesElement) {
        	diagnosesElement.innerHTML = data.diagnoses.join("<br>"); // Join the array into a string with line breaks
    	} else {
        	console.error('Diagnosis element not found');
    	}

    	const iucnLink = document.getElementById('iucn');

    	if (data.IUCN) {
        	iucnLink.href = `https://www.iucnredlist.org/species/${data.IUCN}`;
       	 iucnLink.textContent = 'IUCN Red List ';
    	} else {
      	  iucnLink.href = "#";
       	 iucnLink.textContent = 'No Information';
   	 }
	
            	document.getElementById('comments').textContent = data.comments.join('\n\n') || 'No Information';
            	document.getElementById('etymology').textContent = data.etymologies.join(', ') || 'No Information';
	document.getElementById('external_links').innerHTML = data.external_links.join('<br> ') || 'No Information';
                // Similarly, update other parts of the page with the fetched data
            })
            .catch(error => console.error('Error fetching reptile details:', error));
    }

    const reptileId = getQueryParam('reptile_id');
    if (reptileId) {
        fetchReptileDetails(reptileId);
    }
});


