var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        // Request was succesfull
        if (response.ok) {
            response.json().then(function(data) {
                // Passing response data to DOM function
                displayIssues(data);

                // Checking if api has paginated issues
                if (response.headers.get("link")) {
                    displayWarning(repo);
                }
            })
        } else {
            alert("There was a problem with your request!");
        }
    })
};

var displayIssues = function(issues) {

    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // Creating a link element to take users to the issue in github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // Creating a span to hold the issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // Appending it to the container
        issueEl.appendChild(titleEl);

        // Creating a type element
        var typeEl = document.createElement("span");

        // Checking if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // Appending to the container
        issueEl.appendChild(typeEl);

        issuesContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo) {
    // Adding text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com"
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("targer", "_blank");

    // Appening to warning container
    limitWarningEl.appendChild(linkEl);
}

getRepoIssues("facebook/react");