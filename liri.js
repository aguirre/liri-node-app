require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var moment = require("moment");
moment().format();

//Functions for spotify-this-song command
var getArtist = function(artist) {
  return artist.name;
};

var getSpotify = function(songName) {
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: "track", query: songName, limit: 5 }, function(
    err,
    data
  ) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    var songs = data.tracks.items;
    for (var i = 0; i < songs.length; i++) {
      console.log("Artist: " + songs[i].artists.map(getArtist));
      console.log("Song: " + songs[i].name);
      console.log("Preview: " + songs[i].preview_url);
      console.log("Album: " + songs[i].album.name);
      console.log("----------------------------------------------------");
    }
  });
};

function lookupSong() {
  var spotify = new Spotify(keys.spotify);

  spotify.search(
    { type: "track", query: "San Francisco Knights", limit: 5 },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log("Artist: " + songs[i].artists.map(getArtist));
        console.log("Song: " + songs[i].name);
        console.log("Preview: " + songs[i].preview_url);
        console.log("Album: " + songs[i].album.name);
        console.log("----------------------------------------------------");
      }
    }
  );
}

//Functions for movie-this command
var getMovie = function(movieName) {
  request(
    "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy",
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var movieData = JSON.parse(body);
        console.log("Movie Title: " + movieData.Title);
        console.log("Release Year: " + movieData.Year);
        console.log("IMDB Rating: " + movieData.imdbRating);
        console.log("Country Produced In: " + movieData.Country);
        console.log("Language: " + movieData.Language);
        console.log("Plot: " + movieData.Plot);
        console.log("Actors: " + movieData.Actors);
      }
    }
  );
};

var lookupMovie = function() {
  request(
    "http://www.omdbapi.com/?t=" + "Lucky Number Slevin" + "&apikey=trilogy",
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var movieData = JSON.parse(body);
        console.log("Movie Title: " + movieData.Title);
        console.log("Release Year: " + movieData.Year);
        console.log("IMDB Rating: " + movieData.imdbRating);
        console.log("Country Produced In: " + movieData.Country);
        console.log("Language: " + movieData.Language);
        console.log("Plot: " + movieData.Plot);
        console.log("Actors: " + movieData.Actors);
      }
    }
  );
};

//Function for concert-this command
function getConcert(concertArtist) {
  request(
    "https://rest.bandsintown.com/artists/" +
      concertArtist +
      "/events?app_id=trilogy&date=upcoming",
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var concertData = JSON.parse(body);

        console.log("Artist(s): " + concertData[0].lineup);
        console.log("Venue Name: " + concertData[0].venue.name);
        console.log(
          "Location: " +
            concertData[0].venue.city +
            ", " +
            concertData[0].venue.region +
            " " +
            concertData[0].venue.country
        );
        console.log(
          "Date of Event: " +
            moment(concertData[0].datetime).format("MM-DD-YYYY")
        );
      }
    }
  );
}

//Function for do-what-it-says command
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) throw err;
    var doArr = data.split(",");
    if (doArr.length == 2) {
      choice(doArr[0], doArr[1]);
    }
  });
};

// LIRI command parameters
var choice = function(caseData, functionData) {
  switch (caseData) {
    case "spotify-this-song":
      if (functionData === undefined) {
        lookupSong();
      } else {
        getSpotify(functionData);
      }
      break;
    case "movie-this":
      if (functionData === undefined) {
        lookupMovie();
      } else {
        getMovie(functionData);
      }
      break;
    case "concert-this":
      if (functionData === undefined) {
        console.log("Enter Artist or Band name.");
        return;
      } else {
        getConcert(functionData);
      }
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    // Default message for liri.js or error
    default:
      console.log(
        'LIRI Command Menu: spotify-this-song "song name" | movie-this "movie name" | concert-this "band/artist name" | do-what-it-says'
      );
  }
};

//Funtion to take in command and value
var runThis = function(argOne, argTwo) {
  choice(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
