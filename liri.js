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
      console.log(i);
      console.log("artist(s): " + songs[i].artists.map(getArtist));
      console.log("song name: " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("----------------------------------------------------");
    }
  });
};

function lookupSong() {
  var spotify = new Spotify(keys.spotify);

  spotify.search(
    { type: "track", query: "the sign ace of base", limit: 5 },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtist));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("----------------------------------------------------");
      }
    }
  );
}

var pick = function(caseData, functionData) {
  switch (caseData) {
    case "spotify-this-song":
      if (functionData === undefined) {
        lookupSong();
      } else {
        getSpotify(functionData);
      }
      break;
    default:
      console.log("LIRI does not know how to handle that");
  }
};

var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
