// footer.js
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

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', addFooter);
