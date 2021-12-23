const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

//morgan
app.use(morgan("common"));

//bodyParser
app.use(bodyParser.json());

let topMovies = [
  {
    title: "Kiki's Delivery Service",
    director: {
      name: "Studio Ghibli",
      location: "Japan"
    },
    genre: "Animation"
  },
  {
    title: "Princess Mononoke",
    director: {
      name: "Studio Ghibli",
      location: "Japan"
    },
    genre: "Animation"
  },
  {
    title: "Ponyo",
    director: {
      name: "Studio Ghibli",
      location: "Japan"
    },
    genre: "Animation"
  },
  {
    title: "Howl's Moving Castle",
    director: {
      name: "Studio Ghibli",
      location: "Japan"
    },
    genre: "Animation"
  },
  {
    title: "Spirited Away",
    director: {
      name: "Studio Ghibli",
      location: "Japan"
    },
    genre: "Animation"
  },
  {
    title: "Caslte In the Sky",
    director: {
      name: "Studio Ghibli",
      location: "Japan"
    },
    genre: "Animation"
  },
  {
    title: "My Neighbor Totoro",
    director: {
      name: "Studio Ghibli",
      location: "Japan"
    },
    genre: "Animation"
  },
  {
    title: "Nausicaa of the Valley of the Wind",
    director: {
      name: "Studio Ghibli",
      location: "Japan"
    },
    genre: "Animation"
  },
  {
    title: "The Wind Rises",
    director: {
      name: "Studio Ghibli",
      location: "Japan"
    },
    genre: "Animation"
  },
  {
    title: "When Marnie Was There",
    director: {
      name: "Studio Ghibli",
      location: "Japan"
    },
    genre: "Animation"
  }
];

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.use(express.static("public"));

//Get a list of all movies
app.get("/movies", (req, res) => {
  res.status(200).json(topMovies);
});

//Get data about a specific movie by title
app.get("/movies/:title", (req, res) => {
  res.status(200).json(
    topMovies.find(movie => {
      return movie.title === rep.params.title;
    })
  );
});

//Get data about a genre by name/title
app.get("/genres/:genre", (req, res) => {
  res.status(200).json(
    topMovies.find(genre => {
      return genre.genre === req.params.genre;
    })
  );
});

//Get data about a director
app.get("/directors/:directorName", (req, res) => {
  res.status(200).json(
    topMovies.find(director => {
      return director.director.name === req.params.directorName;
    })
  );
});

//Add/create a new user
app.post("/users/:newUser", (req, res) => {
  res.send("Registration complete.");
});

//Update user information
app.put("/users/:username", (req, res) => {
  res.send("User Profile Updated");
});

//Disable/delete the user profile
app.delete("/users/:deleteUser", (req, res) => {
  res.send("Profile disabled!");
});

//Add new movie to list of favorite
app.post("/favorite/:movieName", (req, res) => {
  res.send("Added to favorites!");
});

// Delete movie from list of favorite
app.delete("/favorite/:deleteMovie", (req, res) => {
  res.send("Removed from favorites.");
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
