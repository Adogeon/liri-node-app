//Package import
var inquire = require("inquirer");

//Inquirer question prompts
inquire.prompt([
    {
        type:"list",
        message:"Welcome, how can I help you today?",
        choices:[ 
            {
                name:"I want to know about a song.",
                value:"song"
            },
            {
                name:"Help me find a concert.",
                value:"concert"
            },
            {
                name:"A movie has been on my mind.",
                value:"movie"
            }
        ],
        name:"choices"
    },
    {
        type:"input",
        message:"Ok, what are you looking for ?",
        name:"search"
    }
]).then(  
    function(inquireResponse) {//call back function to resolve user input
        debugger; //watch inquireResponse
        var searchVal = inquireResponse.search
        switch (inquireResponse.choices) {
            case "song": // import song detail function from the song.js
                displaySongDetail(searchVal);
            case "movie": // import song detail function from the movie.js
                displayMovieDetail(searchVal);
            case "concert": // import song detail function from the concert.js
                displayConcertDetail(searchVal);
        }
    }
)