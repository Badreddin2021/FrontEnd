document.addEventListener('DOMContentLoaded', function () {
  var style = document.createElement('style');
  style.innerHTML = `
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        flex-wrap: wrap;
      }
      
      .navbar {
        display: flex;
        align-items: center;
        position: relative;
        left: -60px;
        /* Moves the navbar 10px to the left */
      }
      
      .navbar a {
        color: black;
        text-decoration: none;
        padding: 2vw 1vw;
        font-size: clamp(12px, 2vw, 24px);
      }
      
      .navbar a:hover {
        color: #999;
        text-decoration: underline;
      }
      
      #logo {
        font-size: clamp(24px, 5vw, 48px);
        font-weight: bold;
        color: black;
      }
      
      .dropdown {
        position: relative;
        display: inline-block;
      }
      
      .dropdown-content {
        display: none;
        position: absolute;
        background-color: #F5F5DC;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
      }
      
      .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        font-size: clamp(12px, 2vw, 16px);
      }
      
      .dropdown-content a:hover {
        background-color: #f1f1f1;
      }
      
      .dropdown:hover .dropdown-content {
        display: block;
      }
 @media (max-width: 600px) {
        .header {
            flex-direction: column; /* Stacks logo and navbar vertically on small screens */
        }
        .navbar {
            flex-direction: column; /* Stacks navbar items vertically */
            align-items: center; /* Center-align the navbar items */
        }
        .navbar a, .dropbtn {
            padding: 10px; /* Increase padding for easier touch */
        }
    }
    `;
  document.head.appendChild(style);

  var navbarHtml = `
        <div class="header">
        <div id="logo">The Reptile <br> Database</div>
        <div class="navbar">
        <a href="index.html">Search</a>
        <div class="dropdown">
            <a href="#" class="dropbtn">About</a>
            <div class="dropdown-content">
            <a href="Information.html">GENERAL INFORMATION AND FAQ</a>
            <a href="statistics.html">STATISTICS</a>
            <a href="editors.html">EDITORS</a>
            <a href="sab.html">SAB</a>
            <a href="credits.html">CREDITS</a>
            </div>
        </div>
        <a href="news.html">News</a>
        <a href="publications.html">Publications</a>
        <div class="dropdown">
            <a href="#data">Data</a>
            <div class="dropdown-content">
            <a href="downloads.html">DOWNLOADS</a>
            <a href="data_sources.html">DATA SOURCES</a>
            </div>
        </div>
        </div>
        </div>
    `;
  document.body.insertAdjacentHTML('afterbegin', navbarHtml);
});