// Data for the Friend Finder app is stored as an array of objects.
// The array could be initialized as empty, but it is initialized with 
// one "friend" object already stored in the array so that when the 
// first person visits the web app, there is already a "user" to use to
// calculate the new user's compatibility (otherwise, the first person would 
// not be able to match up with anyone)
var friendsArray = [
    {
      name: "Ahmed",
      photo: "https://via.placeholder.com/400x400",
      scores: [
          5,
          1,
          4,
          4,
          5,
          1,
          2,
          5,
          4,
          1
      ]
    }
];

module.exports = friendsArray;