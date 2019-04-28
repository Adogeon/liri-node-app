require("dotenv").config()
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var args = process.argv.slice(2);
var Spotify = require('node-spotify-api');

var cmd = args[0]
var querry = args.slice(1);

switch(cmd) {
    case `concert-this`:
        concert_this(querry.join(" "));
        break;
    case `spotify-this-song`:
        spotify_this(querry);
        break;
    case `movie-this`:
        movie_this(querry);
        break;
    case `do-what-it-says`:
        do_wis(querry);
        break;
    default:
        console.log("Wrong command");
        break;
}

function concert_this(artist) {
    console.log("Upcoming concert venue for "+artist)
    artist = artist.split(" ").join("%20");
    var querryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(querryURL).then(function(response){
        
        response.data.forEach(function(el,index) {
            let venue = el.venue;
            console.log(index+1,venue.name);
            console.log("Location: ", venue.city +" "+venue.region+ ", "+venue.country);
            console.log("Date: "+moment(el.datetime).format("MMMM Do, YYYY"));
        })
    }).catch(function(errors) {
        console.log("Error at Bands In Town API request:" + errors);
    })
}

function spotify_this(song) {
    console.log(" ")
    console.log("Here is the result for "+song);
    if (!song) {
        song = "The Sign"
    }
    var spotify = new Spotify(keys.spotify);
    spotify.request('https://api.spotify.com/v1/search?q=\"'+song+'\"&type=track&market=US&limit=10').then(function(data){
        data.tracks.items.forEach(function(track,index) {
            console.log(index+1,track.name)
            if(track.artists.length === 1) {
                console.log("Artist: "+track.artists[0].name);
            } else {
                console.log("Artists:")
                track.artists.forEach(function(item) {
                    console.log("- ",item.name);
                })
            }
            console.log("Preview URL: "+track.external_urls.spotify);
            console.log("Album: ",track.album.name);
            console.log(" ");
        })
    })
}