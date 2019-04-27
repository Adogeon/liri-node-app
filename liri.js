require("dotenv").config()
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var args = process.argv.slice(2);

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