var friends = require("../data/friends");

//routing

module.exports = function(app) {
  
      app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  app.post("/api/friends", function(req, res) {

    const goodMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };


    const userData = req.body;
    const userScores = userData.scores;

 
   var totalDifference;


    for (let i = 0; i < friends.length; i++) {
      const currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      
      for (let j = 0; j < currentFriend.scores.length; j++) {
        const currentFriendScore = currentFriend.scores[j];
        const currentUserScore = userScores[j];

        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      if (totalDifference <= goodMatch.friendDifference) {
        goodMatch.name = currentFriend.name;
        goodMatch.photo = currentFriend.photo;
        goodMatch.friendDifference = totalDifference;
      }
    }

    friends.push(userData);
    res.json(goodMatch);
  });
};
