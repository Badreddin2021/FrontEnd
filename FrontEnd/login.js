document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if(data.message) {
            alert('Login successful');
            localStorage.setItem('isLoggedIn', 'true'); // Ensure this line executes
            window.location.href = 'admin_dashboard.html'; // Redirect to the dashboard
        } else {
            alert(data.error || 'Login failed, please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed, please check your network connection.');
    });
});
