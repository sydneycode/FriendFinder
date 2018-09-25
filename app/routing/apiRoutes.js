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
        console.log(req.body);
        var newUser = req.body;
        var newScores = newUser.scores;
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
        console.log("Name: " + newUser.name + " | Photo: " + newUser.photo);

        // Add the new user's data to the array of objects representing a list of friends
        friendsData.push(newUser);
        res.json(newUser);

        // Display the new user's most compatible friend, using a modal pop-up that 
        // displays both the name and picture of the closest match
        console.log("Name: " + mostCompatibleFriend.name + " | Photo: " + mostCompatibleFriend.photo);
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