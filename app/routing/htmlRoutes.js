var path = require("path");

module.exports = function(app) {

    // HTML GET Requests
    // A GET route to '/survey', which displays the survey page
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // A default route that leads to 'home.html', which displays the home page
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};
