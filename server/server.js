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
  try{
  res.json(Object.values(movieModel));
  }
  catch{
    res.sendStatus(404).send("Movie not found");
  }
});

  

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  const id = req.params.imdbID;
  const movie = movieModel[id];

  if (movie) {
    res.json(movie);
  } else {
    res.sendStatus(404);
  }
});



app.put('/movies/:imdbID', function (req, res) {
  const id = req.params.imdbID;
  const movie = req.body;

  if (movieModel[id]) {
    movieModel[id] = movie;
    res.sendStatus(200);
  } else {
    movieModel[id] = movie;
    res.status(201).json(movie);
  }
});


app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

