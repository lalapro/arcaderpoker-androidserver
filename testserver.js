const express = require('express');
const app = express();
const database = require('./database');
const getFBPics = require('./getFBPics.js');
const bodyParser = require('body-parser');



app.set('port', process.env.PORT);
app.use(bodyParser.json());

app.post('/facebookID', (req, res) => {
  let friends = req.body.friends;
  let deviceId = req.body.deviceId;
  let duelWins = req.body.duelWins;
  let blitzWins = req.body.blitzWins;
  let highscore = req.body.highscore;
  let ownerId = req.body.owner;
  let name = req.body.name;

  console.log(friends)


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
        console.log('fbpiccccs', fbPics)
        friend.profilePic = fbPics[i];
      })
      console.log('friends', friends)
      database.fbFriends.child(ownerId).set({
        name: name,
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
