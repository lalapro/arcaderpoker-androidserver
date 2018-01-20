var fetch = require('node-fetch');

getFBPics = async (id) => {
  let response = await fetch(`https://graph.facebook.com/${id}/picture?type=normal`)
  return response.url

}


module.exports = getFBPics;
