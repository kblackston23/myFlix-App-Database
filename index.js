const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

const myFlixDB = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//morgan
app.use(morgan("common"));

//bodyParser
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

app.use(express.static("public"));

let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

//Get a list of all movies
app.get("/movies", (req, res) => {
  myFlixDB
    .find()
    .then(movies => {
      res.status(201).json(movies);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error" + err);
    });
});

//Get data about a specific movie by title
app.get("/movies/:title", (req, res) => {
  myFlixDB
    .findOne({ Title: req.params.title })
    .then(movie => {
      res.json(movie);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error" + err);
    });
});

//Get data about a genre by name/title
app.get("/genres/:genre", (req, res) => {
  myFlixDB
    .findOne({ "Genre.Name": req.params.genre })
    .then(movie => {
      res.json(movie.Genre);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error" + err);
    });
});

//Get data about a director
app.get("/directors/:directorName", (req, res) => {
  myFlixDB
    .findOne({ "Director.Name": req.params.directorName })
    .then(movie => {
      res.json(movie.Director);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error" + err);
    });
});

//Add/create a new user
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(user => {
            res.status(201).json(user);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Update user information
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error" + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Disable/delete the user profile
app.delete("/users/:deleteUser", (req, res) => {
  Users.findOneAndRemove({ userName: req.params.deleteUser })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.userName + " was not found");
      } else {
        res.status(200).send(req.params.userName + " was deleted");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error" + err);
    });
});

//Add new movie to list of favorite
app.post("/users/:userName/movies/:title", (req, res) => {
  Users.findOneAndUpdate(
    { userName: req.params.userName },
    {
      $push: { FavoriteMovies: req.params.title }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error" + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Delete movie from list of favorite
app.delete("/users/:userName/movies/:title", (req, res) => {
  Users.findOneAndUpdate(
    { userName: req.params.userName },
    {
      $pull: { FavoriteMovies: req.params.title }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error" + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//Listener
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
