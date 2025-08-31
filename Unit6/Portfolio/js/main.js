/* 
main.js
Handles dynamic content loading and navigation for the portfolio site
*/

$(document).ready(function () {

    // Map of page filenames to their headings
    const pageHeadings = {
        "index.xhtml": "About Me",
        "resume.xhtml": "Resume",
        "projects.xhtml": "Projects",
        "blog.xhtml": "Blog",
        "contact.xhtml": "Contact Me"
    };

  // Click handler for navigation links
    $("#navigation a").on("click", function (e) {
        e.preventDefault();

        var $link   = $(this);
        var pageUrl = $link.attr("href");   // "resume.xhtml"
        var styleUrl = $link.attr("rel");   // "css/style-resume.css"

        // Ensure we have a URL
        if (!pageUrl) {
            console.error("Navigation link missing href.");
            return;
        }

        // Swap heading text
        if (pageHeadings[pageUrl]) {
            $("#header h1").text(pageHeadings[pageUrl]);
        }

        // Load just the children of #main-content from the target page
        $("#main-content").load(pageUrl + " #main-content > *", function (response, status, xhr) {
            // Graceful failure
            if (status === "error") {
                console.error("Error loading " + pageUrl + ": " + xhr.status + " " + xhr.statusText);
                $("#main-content").html("<p>Sorry — content could not be loaded.</p>");
                return;
            }

            // Swap the per-page stylesheet if rel provided
            if (styleUrl) {
                $("#page-style").attr("href", styleUrl);
            }

            // Update navigation "active" styling
            $("#navigation a").removeClass("active");
            $link.addClass("active");

            // After the content loads, inject the script and initialize it
            if (pageUrl === "contact.xhtml") {
                loadScript("js/contact.js", function () {
                    if (typeof initContactForm === "function") {
                        initContactForm();
                    }
                });
            }
            else if (pageUrl === "projects.xhtml") {
                loadScript("js/projects.js", function () {
                    if (typeof initProjectsPage === "function") {
                        initProjectsPage();
                    }
                });
            }
            else {
                loadScript(null); // remove any previously loaded script
            }
        });
    });

    // Code retrieved from https://jsfiddle.net/mnQb6/ 
    // Back to Top button functionality
    const backToTopBtn = $("#backToTop");

    // Show/hide on scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            backToTopBtn.fadeIn();
        } else {
            backToTopBtn.fadeOut();
        }
    });
    // End of code from https://jsfiddle.net/mnQb6/

    // Smooth scroll back to top
    backToTopBtn.click(function () {
         $("html, body").animate({scrollTop: 0}, 1000);
    });

    // Set initial active nav link based on current page name
    (function setInitialActive() {
        var current = window.location.pathname.split("/").pop() || "index.xhtml";
        $("#navigation a").each(function () {
        if ($(this).attr("href") === current) {
            $(this).addClass("active");
            // If the current page is not the index (i.e., loaded directly), ensure stylesheet matches
            var relStyle = $(this).attr("rel");
            if (relStyle) {
            $("#page-style").attr("href", relStyle);
            }
        }
        });
    })();

    function loadScript(jsFile, callback) {
        // Remove any previously loaded page-specific script
        $("#page-script").remove();

        if (!jsFile) return; // nothing to load

        // Create a new <script> element
        var script = document.createElement("script");
        script.src = jsFile;
        script.id = "page-script";
        script.type = "text/javascript";
        script.onload = callback;
        // Append it to the <head> 
        document.head.appendChild(script);
    }
});
