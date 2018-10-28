# LIRI Bot

## Spotify API Lookup

```
node liri.js spotify-this-song "song name here"
```

This will show the following information about the song in your terminal/bash window:

- Artist(s)
- The song's name.
- A preview link of the song from Spotify.
- The album that the song is from.

Example of Spotify Lookup:
<img src="images/song.gif" alt="spotify-this-song">

## OMDB Movie API Lookup

```
node liri.js movie-this "movie name here"
```

This will output the following information to your terminal/bash window:

- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.

Example of OMDB Movie API Lookup:
<img src="images/movie.gif" alt="movie-this">

## Bands in Town API Lookup

```
node liri.js concert-this "artist/band name here"
```

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

- Name of the venue
- Venue location
- Date of the Event (use moment to format this as "MM/DD/YYYY")

Exampe of Bands in Town API Lookup:
<img src="images/concert.gif" alt="concert-this">
<img src="images/do.gif" alt="do-what-it-says">
