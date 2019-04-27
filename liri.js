require("dotenv").config()
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var args = process.argv.slice(2);

var cmd = args[0]
var querry = args.slice(1);

switch(cmd) {
    case `concert-this`:
        concert_this(querry.join("%20"));
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
    //get concert info about an artist
    //display
    // - Name of venue
    // - Venue location
    // - data of event
    // Per bands in town API
    // - Name of venue:
    //    -- response.
    var querryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(querryURL).then(function(response){
        response.forEach(function(el,index) {
            let venue = el.venue;
            let date = new Date(el.datetime);
            console.log(index,venue.name);
            console.log("Location: ", venue.city +" ,"+venue.region+ " "+venue.country);
            console.log("Date: ");
        })
    }).catch(errors) {
        console.log("Error at Bands In Town API request:" + errors);
    }
}