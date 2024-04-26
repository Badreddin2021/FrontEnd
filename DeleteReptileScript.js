document.getElementById('load-reptile').addEventListener('click', function() {
    const reptileId = document.getElementById('reptile-id').value;
    if (reptileId) {
        fetch(`http://localhost:5000/reptiles/${reptileId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('response-message').textContent = 'Reptile not found!';
                clearFormFields();  // Clear all fields on fetch error

            } else {
                populateForm(data);
                document.getElementById('response-message').textContent = '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('response-message').textContent = 'Failed to fetch reptile data!';
            clearFormFields();  // Clear all fields on fetch error
        });
    }
});

function populateForm(data) {
    console.log(data);
    const detailsContainer = document.getElementById('reptile-details');
    detailsContainer.innerHTML = ''; // Clear previous details

    // Create dynamic inputs
    createInput(detailsContainer, 'Higher Taxa', data.taxa);
    createInput(detailsContainer, 'Subspecies_1', data.subspecies_1);
    createInput(detailsContainer, 'Subspecies_2', data.subspecies_2);
    createInput(detailsContainer, 'Common Names', data.common_names.join(', '), 'textarea');
    createInput(detailsContainer, 'Synonyms', data.synonyms.join(', '), 'textarea');
    createInput(detailsContainer, 'Distributions', data.distributions.join(','),'textarea');
    createInput(detailsContainer, 'Subspecies Finder', data.subspecies_finder);
    
    createInput(detailsContainer, 'Year Found', data.subspecies_year, 'number');
    
    // Continue for other fields as necessary
}

function createInput(container, name, value = '', type = 'text') {
    const div = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = `${name.replace('_', ' ')}:`;
    label.htmlFor = name;

    let input;
    if (type === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 4;
        input.cols = 50;
    } else {
        input = document.createElement('input');
        input.type = type;
    }

    input.id = name;
    input.name = name;
    input.value = value;
    input.placeholder = `Enter ${name.replace('_', ' ')}`;

    div.appendChild(label);
    div.appendChild(input);
    container.appendChild(div);
}

function clearFormFields() {
    const detailsContainer = document.getElementById('reptile-details');
    const inputs = detailsContainer.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.value = '';  // Reset value
    });
}


function deleteReptile() {
    const reptileId = document.getElementById('reptile-id').value;
    if (confirm('Are you sure you want to delete this reptile?')) {
        fetch(`http://localhost:5000/reptiles/delete/${reptileId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('Reptile deleted successfully!');
            document.getElementById('reptile-details').innerHTML = '';
            document.getElementById('delete-button').style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to delete reptile');
        });
    }
}