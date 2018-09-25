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
    // handle incoming survey reuslts; this route will also be used to
    // handle the compatibility logic
    app.post("/api/friends", function(req, res) {
        var newUser = req.body;
        var newScores = newUser.scores;
        var mostCompatibleFriend;
        var maxCompatibilityScore = 0;
        for (var i = 0; i < friendsData.length; i++) {
            var currentScores = friendsData[i].scores;
            var currentCompatibilityScore = getTotalDifference(newScores, currentScores);
            if (currentCompatibilityScore > maxCompatibilityScore) {
                maxCompatibilityScore = currentCompatibilityScore;
                mostCompatibleFriend = friendsData[i];
            }
        }

        // Add the new user's data to the array of objects representing a list of friends
        friendsData.push(newUser);

        // Display the new user's most compatible friend, using a modal pop-up that 
        // displays both the name and picture of the closest match
        console.log("Name: " + friendsData.name + "| Photo: " + friendsData.photo);
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
    console.log(totalDifference)
    return totalDifference;
}