document.getElementById('add-reptile-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:5000/reptiles/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
         alert('Reptile has been added successfully!');
        // Handle success (e.g., show a success message, redirect, etc.)
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors (e.g., show an error message)
         alert('Failed to add reptile. Error code: ' + error.code);
    });
});
