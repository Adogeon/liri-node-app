require("dotenv").config()
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const Spotify = require('node-spotify-api');
const fs = require('fs');

function logThis(str) {
    const breakLine = "\n+++++++++++++++++++++++++++++++++\n";
    fs.appendFile("log.txt",str+breakLine,(err)=>{
        if(err)
            console.log("Error:"+err);
        else
            console.log(str+breakLine);
    })
}


var Grabber = function() {

    this.concert_this = function(artist) {
        console.log("Upcoming concert venue for "+artist+"\n")
        var querryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        axios.get(querryURL).then(function(response){
            response.data.forEach(function(el,index) {
                let venue = el.venue;
                let dataStream = [
                    `${index+1},${venue.name}`,
                    `Location: ${venue.city} ${venue.region}, ${venue.country}`,
                    `Date: ${moment(el.datetime).format("MMMM Do, YYYY")}`
                ].join("\n");
                logThis(dataStream);
            })
        }).catch(function(errors) {
            console.log("Error at Bands In Town API request:" + errors);
        })
    }
    
    this.spotify_this = function(song) {
        if (!song) {
            song = "The Sign";
        }
        console.log("Here is the result for "+song+"\n");
        var spotify = new Spotify(keys.spotify);
        spotify.request('https://api.spotify.com/v1/search?q=\"'+song+'\"&type=track&market=US&limit=10').then(function(data){
            data.tracks.items.forEach(function(track,index) {
                let dataStream = [`${index+1}) Track: ${track.name}`]
                if(track.artists.length < 2) {
                    dataStream.push(`Artist: ${track.artists[0].name}`);
                } else {
                    let artistStr = "Artists:\n";
                    track.artists.forEach(function(item) {
                        artistStr = artistStr+`- ${item.name}\n`;
                    })
                    dataStream.push(artistStr);
                }
                dataStream = dataStream.concat([
                    `Preview URL: ${track.external_urls.spotify}`,
                    `Album: ${track.album.name}`
                ]);
                logThis(dataStream.join("\n"));
            })
        })
    }
    
    this.movie_this = function(title) {
        if(!title) {
            title = "Mr. Nobody"
        }
        console.log("Movie result for "+title+"\n")
        title = title.split(" ").join("+");
        var querryURL = "https://www.omdbapi.com/?apikey=trilogy&t="+title;
        axios.get(querryURL).then(function(response){
            let data = response.data;
            let dataStream = [
                `Title: ${data.Title}`,
                `Year: ${data.Year}`,
                `IMBD Rating: ${data.Ratings[0].Value}`,
                `Rotten Tomatoes Rating: ${data.Ratings[1].Value}`,
                `Contry: ${data.Country}`,
                `Language :" ${data.Language}`,
                `Plot: ${data.Plot}`,
                `Actors: ${data.Actors}`,
            ].join("\n");
            logThis(dataStream);
        })
    }
}

module.exports = Grabber;