document.getElementById('load-reptile-button').addEventListener('click', function() {
    const reptileId = document.getElementById('reptile-id').value;
    if (!reptileId) {
        alert('Please enter a valid Reptile ID.');
        return;
    }
    
    fetch(`http://localhost:5000/reptiles/${reptileId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Reptile not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('taxa').value = data.taxa || '';
            document.getElementById('subspecies_1').value = data.subspecies_1 || '';
            document.getElementById('subspecies_2').value = data.subspecies_2 || '';
            document.getElementById('subspecies_finder').value = data.subspecies_finder || '';
            document.getElementById('subspecies_year').value = data.subspecies_year || '';

            // Handle dynamic fields like synonyms, common names etc.
            const commonNamesContainer = document.getElementById('common-names-container');
            commonNamesContainer.innerHTML = '<label for="common-names">Common Names:</label><button type="button" onclick="addCommonName()">Add Common Name</button>';
            data.common_names.forEach(name => {
                const input = document.createElement('input');
                input.type = 'text';
                input.name = 'common_names[]';
                input.value = name;
                input.placeholder = 'Enter common name';
                commonNamesContainer.appendChild(input);
            });
           
            const synonymsContainer = document.getElementById('synonyms-container');
            synonymsContainer.innerHTML = '<label for="synonyms">Synonyms:</label><button type="button" onclick="addSynonym()">Add Synonym</button>';
            data.synonyms.forEach(synonym => {
                const input = document.createElement('input');
                input.type = 'text';
                input.name = 'synonyms[]';
                input.value = synonym;
                input.placeholder = 'Enter synonym';
                synonymsContainer.appendChild(input);
            });

         const distributionsContainer = document.getElementById('distributions-container');
         distributionsContainer.innerHTML = '<label for="distributions">Distributions:</label><button type="button" onclick="addDistribution()">Add Distribution</button>';
          data.distributions.forEach(distribution => {
          const input = document.createElement('input');
          input.type = 'text';
          input.name = 'distributions';
          input.value = distribution;
          input.placeholder = 'Enter distribution';
          distributionsContainer.appendChild(input);
    });	
         const diagnosesContainer = document.getElementById('diagnoses-container');
          diagnosesContainer.innerHTML = '<label for="diagnoses">Diagnoses:</label><button type="button" onclick="addDiagnosis()">Add Diagnosis</button>';
          data.diagnoses.forEach(diagnosis => {
          const input = document.createElement('input');
          input.type = 'text';
          input.name = 'Diagnoses';
          input.value = diagnosis;
          input.placeholder = 'Enter Diagnosis';
          diagnosesContainer.appendChild(input);
    });		
         const commentsContainer = document.getElementById('comments-container');
         commentsContainer.innerHTML = '<label for="comments">Comments:</label><button type="button" onclick="addComment()">Add Comment</button>';
         data.comments.forEach(comment => {
         const input = document.createElement('input');
         input.type = 'text';
         input.name = 'comments[]';
         input.value = comment;
         input.placeholder = 'Enter comment';
         commentsContainer.appendChild(input);
         });
          const etymologiesContainer = document.getElementById('Etymology-container');
          etymologiesContainer.innerHTML = '<label for="etymologies">Etymologies:</label><button type="button" onclick="addEtymology()">Add Etymolgoy</button>';
          data.etymologies.forEach(etymology => {
          const input = document.createElement('input');
          input.type = 'text';
          input.name = 'etymologies';
          input.value = etymology;
          input.placeholder = 'Enter Etymology';
          etymologiesContainer.appendChild(input);
    });		
          const specimensContainer = document.getElementById('specimens-container');
          specimensContainer.innerHTML = '<label for="specimens">Specimens:</label><button type="button" onclick="addSpecimen()">Add Specimen</button>';
          data.specimens.forEach(specimen => {
          const input = document.createElement('input');
          input.type = 'text';
          input.name = 'specimens';
          input.value = specimen;
          input.placeholder = 'Enter Specimen';
          specimensContainer.appendChild(input);
    });		
          const externalsContainer = document.getElementById('externals-container');
          externalsContainer.innerHTML = '<label for="externals">Externals:</label><button type="button" onclick="addExternal()">Add External</button>';
          data.external_links.forEach(external_link => {
          const input = document.createElement('input');
          input.type = 'text';
          input.name = 'external_links';
          input.value = external_link;
          input.placeholder = 'Enter External Link';
          externalsContainer.appendChild(input);
    });		

            // Extend this logic to other dynamic fields as needed
        })
        .catch(error => {
            alert('Error loading reptile: ' + error.message);
            console.error('Error:', error);
        });
});




document.getElementById('edit-reptile-form').addEventListener('submit', function(e) {
	e.preventDefault();
	const reptileId = document.getElementById('reptile-id').value;
	const formData = new FormData(e.target);
	const data = Object.fromEntries(formData.entries());
	
	// Handle multiple entries for common names and synonyms and others
    	data.common_names = formData.getAll('common_names[]');
    	data.synonyms = formData.getAll('synonyms[]');
	data.distributions = formData.getAll('distributions[]');
                data.comments = formData.getAll('comments[]');
	data.etymologies = formData.getAll('etymologies[]');
	data.specimens = formData.getAll('specimens[]');
	data.external_links = formData.getAll('external_links[]');
	data.diagnoses = formData.getAll('diagnoses[]');
	fetch(`http://localhost:5000/reptiles/update/${reptileId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('response-message').textContent = 'Success: Reptile updated successfully';
                console.log('Success:', data);
	alert("Reptile Update was successful");
            })
            .catch((error) => {
                document.getElementById('response-message').textContent = 'Error: Failed to update reptile';
                console.error('Error:', error);
	alert("Reptile Update was Unsuccessful");
            });
        });

function addCommonName() {
    const container = document.getElementById('common-names-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'common_names[]';
    input.placeholder = 'Enter common name';
    container.appendChild(input);
}

function addSynonym() {
    const container = document.getElementById('synonyms-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'synonyms[]';
    input.placeholder = 'Enter synonym';
    container.appendChild(input);
}
function addDistribution() {
    const container = document.getElementById('distributions-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'distributions[]';
    input.placeholder = 'Enter distribution';
    container.appendChild(input);
}
function addDiagnosis() {
    const container = document.getElementById('diagnoses-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'diagnoses[]';
    input.placeholder = 'Enter Diagnoses';
    container.appendChild(input);
}

function addComment() {
    const container = document.getElementById('comments-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'comments[]';
    input.placeholder = 'Enter comment';
    container.appendChild(input);
}
function addEtymology() {
    const container = document.getElementById('Etymology-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'etymologies[]';
    input.placeholder = 'Enter Etymology';
    container.appendChild(input);
}
function addSpecimen() {
    const container = document.getElementById('specimens-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'specimens[]';
    input.placeholder = 'Enter Specimen';
    container.appendChild(input);
}
function addExternal() {
    const container = document.getElementById('externals-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'external_links[]';
    input.placeholder = 'Enter External Link';
    container.appendChild(input);
}
