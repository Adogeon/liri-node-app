const grabber = require("./support/grabber.js")
var cmd = process.argv[2]
var querry = process.argv.slice(3).join(" ");
processCMD(cmd,querry);

function processCMD(command,querrySearch) {
    switch(command) {
        case `concert-this`:
            grabber.concert_this(querrySearch);
            break;
        case `spotify-this-song`:
            grabber.spotify_this(querrySearch);
            break;
        case `movie-this`:
            grabber.movie_this(querrySearch);
            break;
        case `do-what-it-says`:
            do_wis();
            break;
        default:
            console.log("Wrong command");
            break;
    }
}

function do_wis() {
    const fs = require('fs');
    fs.readFile('./random.txt',"utf8", (err, data)=> {
        if(err)
            console.log("Error readinf text:"+err);
        let line = data.split(",");
        let cmd = line[0];
        let querry = line[1];
        processCMD(cmd,querry);
    })
}
