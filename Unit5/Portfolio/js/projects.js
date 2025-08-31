/* 
    Project Class Definition 
     Represents a single portfolio project with its metadata.
*/
function Project(name, category, date, description, imageUrl, githubUrl, creditUrl) {
    this.name = name;
    this.category = category;
    this.date = new Date(date); // stored as Date object
    this.description = description;
    this.imageUrl = imageUrl;
    this.githubUrl = githubUrl;
    this.creditUrl = creditUrl;
}

/* 
    Sample project data 
    A hard-coded dataset of projects for demonstration.
*/
let projects = [
    new Project(
      "HabitWise App",
      "Mobile Apps",
      "2025-07-22",
      "Built using .NET MAUI and Firebase to help users track habits.",
      "images/HabitWise.jpeg",
      "https://github.com/melvin-acho/habitwise",
      "https://www.vecteezy.com/free-photos/social-media"
    ),
    new Project(
      "Postagram App",
      "Web Development",
      "2025-06-15",
      "A social media application built with Django and React.",
      "images/Postagram.jpeg",
      "https://github.com/melvin-acho/postagram",
      "https://www.vecteezy.com/free-photos/social-media"
    ),
    new Project(
      "API Hub Integrations",
      "Integration Projects",
      "2024-11-05",
      "Unified REST API gateway for internal systems, with auth and rate limiting.",
      "images/ApiHub.jpeg",
      "https://github.com/melvin-acho/api-hub",
      "https://www.vecteezy.com/"
    ),
    new Project(
      "Portfolio Site",
      "Web Development",
      "2025-02-10",
      "Responsive personal portfolio built with semantic HTML and clean CSS.",
      "images/Portfolio.jpeg",
      "https://github.com/melvin-acho/portfolio",
      "https://www.vecteezy.com/"
    )
];

// Keeps track of the currently displayed project list
let currentProjects = projects.slice();

// Dynamically builds and injects project HTML elements into the page.
function renderProjects(list) {
    let container = document.getElementById("project-list");
    container.innerHTML = ""; // Clear previous content

    for (let i = 0; i < list.length; i++) {
        let proj = list[i];
        let formattedDate = proj.date.toLocaleDateString();

        // Create wrapper div for each project
        let div = document.createElement("div");
        div.className = "project";

        // Insert project details as HTML
        div.innerHTML =
            '<img src="' + proj.imageUrl + '" alt="Image for ' + proj.name + '" class="projectimg" />' +
            '<h3>' + proj.name + '</h3>' +
            '<p><strong>Date:</strong> ' + formattedDate + '</p>' +
            '<p>' + proj.description + '</p>' +
            '<p><a href="' + proj.githubUrl + '" target="_blank">View on GitHub</a></p>' +
            '<p><a href="' + proj.creditUrl + '" target="_blank">Image Credit</a></p>';

        container.appendChild(div); // Add project to container
    }
}

// Filters the project list based on category and updates the UI.
function filterProjects(category) {
    if (category === "all") {
        currentProjects = projects.slice(); // reset to all
    } else {
        currentProjects = projects.filter(function (p) {
            return p.category === category;
        });
    }
    renderProjects(currentProjects);

    // update active button UI
    let buttons = document.querySelectorAll("#filters button");
    buttons.forEach(function (btn) {
        btn.classList.remove("active");
        if (btn.textContent === category || (category === "all" && btn.textContent === "All")) {
            btn.classList.add("active");
        }
    });
}

// Sorts the current project list by name or date, ascending/descending.
function sortProjects() {
    let sortBy = document.getElementById("sortSelect").value;

    if (sortBy === "name-asc") {
        currentProjects.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    } 
    else if (sortBy === "name-desc") {
        currentProjects.sort(function (a, b) {
            return b.name.localeCompare(a.name);
        });
    }
    else if (sortBy === "date-asc") {
        currentProjects.sort(function (a, b) {
            return a.date - b.date; // oldest first
        });
    }
    else if (sortBy === "date-desc") {
        currentProjects.sort(function (a, b) {
            return b.date - a.date; // newest first
        });
    }
    renderProjects(currentProjects);
}

// Filters projects by matching keyword (regex) against name/description.
function searchProjects() {
    let keyword = document.getElementById("searchInput").value.trim();
    if (keyword === "") {
        // If search box is empty, show all projects
        renderProjects(currentProjects);
        return;
    }

    try {
        let regex = new RegExp(keyword, "i"); // case-insensitive search
        let results = currentProjects.filter(function (p) {
            return regex.test(p.name) || regex.test(p.description);
        });
        renderProjects(results);
    } catch (e) {
        // If regex is invalid, gracefully show all
        renderProjects(currentProjects);
    }
}


// Attach event listeners and render default project list on page load.
window.onload = function () {
    // Add event listener for search input
    document.getElementById("searchInput").addEventListener("input", searchProjects);

    // Add event listeners for filter buttons
    let filterButtons = document.getElementsByClassName("filter-btn");
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", function () {
            let category = this.getAttribute("rel");
            filterProjects(category);
        });
    }

    // Add event listener for sorting dropdown
    document.getElementById("sortSelect").addEventListener("change", sortProjects);

    // Initial render of all projects
    renderProjects(currentProjects);
};
