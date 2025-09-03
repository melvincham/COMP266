
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("index.xhtml")) {
        loadGitHubActivity();
    }
});

function loadGitHubActivity() {
    $.ajax({
        url: "https://api.github.com/users/melvincham/events/public",
        method: "GET",
        dataType: "json",
        success: function (events) {
            var container = $("#github");
            container.empty();
            container.append("<h2>GitHub Activity Feed</h2>");

            if (events.length === 0) {
                container.append("<p>No recent public activity found.</p>");
                return;
            }

            var list = $("<ul></ul>");
            events.slice(0, 5).forEach(function (event) {
                var item = $("<li></li>").text(
                    event.type + " at " + (event.repo ? event.repo.name : "unknown repo")
                );
                list.append(item);
            });
            container.append(list);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching GitHub activity:", error);
            $("#github").append("<p>Unable to load GitHub activity at this time.</p>");
        }
    });
}