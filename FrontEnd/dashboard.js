document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        alert('You must be logged in to view this page.');
        window.location.href = 'login.html'; // Redirect to login page
    }
});
document.getElementById('logoutButton').addEventListener('click', function() {
    // If using localStorage for session management

    localStorage.removeItem('isLoggedIn');

   // Redirect to login page or home page after logout
        alert('You are now logged out, the session logs have been saved. Hope to see you again soon');
        window.location.href = 'login.html'; // Redirect to login page
});
