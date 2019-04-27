var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "1f50ec558d5747d2ba7f22c6529208f7",
  secret: "b9b11979150546d6ae45f563d847f7b5"
});
 
spotify.search({ type: 'track', query: 'Smoke & Mirrors' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});