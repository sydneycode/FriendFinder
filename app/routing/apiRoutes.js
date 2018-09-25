var friendsData = require("../data/friends");

module.exports = function(app) {

    // API GET Request
    // A GET route with the url '/api/friends', which will be used to 
    // display a JSON of all possible friends
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    // API POST Request
    // A POST route with the url '/api/friends', which will be used to 
    // handle incoming survey results; this route will also be used to
    // handle the compatibility logic
    app.post("/api/friends", function(req, res) {
        var newUser = req.body;
        var newScores = [];
        for (var i = 0; i < newUser.scores.length; i++) {
            newScores.push(parseInt(newUser.scores[i]));
        }
        //var newScores = newUser.scores;
        var mostCompatibleFriend;

        // Set the difference between user scores to be a very high value initially
        var minDiff = Number.MAX_VALUE;
        for (var i = 0; i < friendsData.length; i++) {
            var currentScores = friendsData[i].scores;
            var currentDiff = getTotalDifference(newScores, currentScores);

            // if the current difference is less than the minimum difference, record 
            // the current friend as the most compatible friend for the new user
            if (currentDiff < minDiff) {
                minDiff = currentDiff;
                mostCompatibleFriend = friendsData[i];
            }
        }

        newUser.scores = newScores;
        // Add the new user's data to the array of objects representing a list of friends
        friendsData.push(newUser);

        // Send the new user's most compatible friend back as the response
        res.json(mostCompatibleFriend);
    });

};

// Calculate the "totalDifference" between two arrays
function getTotalDifference(arr1, arr2) {
    var totalDifference = 0;
    // Assume that both arrays are the same length
    for (var i = 0; i < arr1.length; i++) {
        var difference = Math.abs(arr1[i] - arr2[i]);
        totalDifference += difference;
    }
    return totalDifference;
}