const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
 fetch("http://www.omdbapi.com/?apikey=a8cbe32d&s=Bridget+Jones")
      .then(response => response.json())
      .then(data => {
      const twoMovies = data.Search.slice(0,2)

    fetch("http://www.omdbapi.com/?apikey=a8cbe32d&s=mamma+mia")
      .then(response => response.json())
      .then(data => {
      const twoMovies2 = data.Search.slice(0,2)  
      
    fetch("http://www.omdbapi.com/?apikey=a8cbe32d&s=love+actually")
      .then(response => response.json())
      .then(data => {
      const oneMovie = data.Search.slice(0,1)

      const mergedMovies = twoMovies.concat(oneMovie);
      const threeMovies = mergedMovies.concat(twoMovies2);

      Promise.all(
       threeMovies.map(movie => 
        fetch(`http://www.omdbapi.com/?apikey=a8cbe32d&i=${movie.imdbID}`)
        .then(response2 => response2.json())
      )
    ).then(fullMovies => {

        const structured = fullMovies.map(movie => ({
          Title: movie.Title,
          Released: new Date(movie.Released).toLocaleDateString('en-CA'),
          Runtime: parseInt(movie.Runtime),
          Genres: (movie.Genre).split(','),
          Directors: (movie.Director).split(','),
          Writers: (movie.Writer).split(','),
          Actors: (movie.Actors).split(','),
          Plot: movie.Plot,
          Poster: movie.Poster,
          Metascore: parseInt(movie.Metascore),
          imdbRating: parseFloat(movie.imdbRating)
        }))
        res.json(structured)
        })
      })
    })
  })

  //res.sendStatus(404)
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  /* Task 2.1. Remove the line below and add the 
    functionality here */
  res.sendStatus(404)
})

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists 
     and continue as described in the assignment */

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

