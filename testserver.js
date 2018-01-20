const express = require('express');
const app = express();
const database = require('./database');
const getFBPics = require('./getFBPics.js');



app.set('port', process.env.PORT);

app.get('/facebookID', (req, res) => {

  let friends = req.query.friends;

  const promises = [];

  friends.forEach((friend, i) => {
    // console.log(friend.id)
    promises.push(getFBPics(friend.id))
  })

  Promise.all(promises).then(fbPics => {
    friends.forEach((friend, i) => {
      friend.profilePic = fbPics[i];
    })
    // console.log(friends)
    database.fbFriends.child('test').set({
      name: 'test',
      friends: [friends],
      highscore: highscore,
      deviceId: deviceId,
      fbPic: personalPic,
      duelWins: duelWins,
      blitzWins: blitzWins
    })

  }).then(x => {
    res.send();
  })


})




app.listen(app.get('port'))