require("dotenv").config();
var keys = require("./keys.js");
var moment = require('moment'); 
moment().format();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var spotify = new Spotify({
    id: "f1ae92b417ed4086bd0ffaa68c335275",
    secret: "bccdbe7a0c34420a8b1460d070c3ba8a"
  });

var userOption = process.argv[2]; 
var inputParameter = process.argv[3];

UserInputs(userOption, inputParameter);

//FUNCTIONS
function UserInputs (userOption, inputParameter){
    switch (userOption) {
    case 'concert-this':
        concertThis();
        break;
    case 'spotify-this-song':
        songInfo(inputParameter);
        break;
    case 'movie-this':
        movieInfo(inputParameter);
        break;
    case 'do-what-it-says':
        showInfo();
        break;
    default: 
        console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

 function concertThis() {
    inputParameter = process.argv.slice(3).join("+");
    console.log(inputParameter);
    var queryURL = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
   axios.get(queryURL).then(function(response) {
    
        for (var i = 0; i < 5; i++) {  
            console.log("Event Info");  
            fs.appendFileSync("log.txt", "Event Info\n");
            console.log(i);
            fs.appendFileSync("log.txt", i+"\n");
            console.log("Name of the Venue: " + response.data[i].venue.name);
            fs.appendFileSync("log.txt", "Name of the Venue: " + response.data[i].venue.name+"\n");
            console.log("Venue Location: " +  response.data[i].venue.city);
            fs.appendFileSync("log.txt", "Venue Location: " +  response.data[i].venue.city+"\n");
            console.log("Date of the Event: " +  response.data[i].datetime);
            fs.appendFileSync("log.txt", "Date of the Event: " +  response.data[i].datetime+"\n");
            console.log("*****************************");
            fs.appendFileSync("log.txt", "*****************************"+"\n");
        }
     
});
}
function songInfo(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "The Sign"; 
    }
    inputParameter = process.argv.slice(3).join("+");
    console.log(inputParameter);
    spotify.search(
        {
            type: "track",
            query: inputParameter
        }).then(function (response) {
         
            var songs = response.tracks.items;

            for (var i = 0; i < 5; i++) {
                console.log("Song Info");
                fs.appendFileSync("log.txt", "Song Info\n");
                console.log(i);
                fs.appendFileSync("log.txt", i +"\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("*****************************");  
                fs.appendFileSync("log.txt", "*****************************\n");
        }
        });}

function movieInfo(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "Mr. Nobody"
    }
    inputParameter = process.argv.slice(3).join();
    var queryURL = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(function(response) {
      
            var movies = response.data;
            console.log("Movie Info");  
            fs.appendFileSync("log.txt", "Movie Info\n");
            console.log("Title: " + movies.Title);
            fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
            console.log("Release Year: " + movies.Year);
            fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
            console.log("IMDB Rating: " + movies.imdbRating);
            fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            fs.appendFileSync("log.txt", "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n");
            console.log("Country of Production: " + movies.Country);
            fs.appendFileSync("log.txt", "Country of Production: " + movies.Country + "\n");
            console.log("Language: " + movies.Language);
            fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
            console.log("Plot: " + movies.Plot);
            fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
            console.log("Actors: " + movies.Actors);
            fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n");
            console.log("*****************************");  
            fs.appendFileSync("log.txt", "*****************************\n");
        }
)}

function showInfo() {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        console.log(dataArr);
       songInfo(dataArr[1]);
    })
}