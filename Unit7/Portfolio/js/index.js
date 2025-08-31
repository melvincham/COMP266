
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("index.xhtml")) {
        loadGitHubActivity();
    }
});

function loadGitHubActivity() {
    const username = "melvincham";
    const feedElement = document.getElementById("github-feed");

    fetch(`https://api.github.com/users/${username}/events/public`)
        .then(response => response.json())
        .then(events => {
            feedElement.innerHTML = ""; // clear placeholder

            // Limit to 5 latest activities
            events.slice(0, 5).forEach(event => {
                const li = document.createElement("li");

                switch (event.type) {
                    case "PushEvent":
                        li.textContent = `Pushed ${event.payload.commits.length} commit(s) to ${event.repo.name}`;
                        break;
                    case "CreateEvent":
                        li.textContent = `Created ${event.repo.name}`;
                        break;
                    case "WatchEvent":
                        li.textContent = `Starred ${event.repo.name}`;
                        break;
                    default:
                        li.textContent = `${event.type} on ${event.repo.name}`;
                }

                feedElement.appendChild(li);
            });
        })
        .catch(error => {
            feedElement.innerHTML = "<li>Could not load activity.</li>";
            console.error("GitHub API error:", error);
        });
}
