require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var moment = require("moment");
moment().format();

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
      console.log("album: " + songs[i].album.name);
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

var getMovie = function(movieName) {
  request(
    "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy",
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var movieData = JSON.parse(body);
        console.log("Movie Title: " + movieData.Title);
        console.log("IMDB Rating: " + movieData.imdbRating);
        console.log("Country Produced In: " + movieData.Country);
        console.log("Language: " + movieData.Language);
        console.log("Plot: " + movieData.Plot);
        console.log("Actors: " + movieData.Actors);
        console.log(movieData.Ratings[1]);
        console.log("Release Year: " + movieData.Year);
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
        console.log("IMDB Rating: " + movieData.imdbRating);
        console.log("Country Produced In: " + movieData.Country);
        console.log("Language: " + movieData.Language);
        console.log("Plot: " + movieData.Plot);
        console.log("Actors: " + movieData.Actors);
        console.log(movieData.Ratings[1]);
        console.log("Release Year: " + movieData.Year);
      }
    }
  );
};

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
    default:
      console.log("LIRI can't handle your request.");
  }
};

var runThis = function(argOne, argTwo) {
  choice(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
