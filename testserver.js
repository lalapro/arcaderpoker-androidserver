const express = require('express');
const app = express();
const database = require('./database');
const getFBPics = require('./getFBPics.js');



app.set('port', process.env.PORT);

app.get('/facebookID', (req, res) => {

  let friends = req.query.friends;
  let deviceId = req.query.deviceId;
  let duelWins = req.query.duelWins;
  let blitzWins = req.query.blitzWins;
  let highscore = req.query.highscore;
  let ownerId = req.query.owner;


  if (highscore === undefined) {
    highscore = "0";
  }
  let personalPic;
  const promises = [];

  getFBPics(ownerId).then(pic => {
    personalPic = pic
  })
  .then(x => {
    friends.forEach((friend, i) => {
      // console.log(friend.id)
      promises.push(getFBPics(friend.id))
    })

    if (personalPic === undefined) personalPic = 'undefined'
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

    }).then(y => {
      res.send();
    })

  })


})




app.listen(app.get('port'))
