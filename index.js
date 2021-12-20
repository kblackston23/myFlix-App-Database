const express = require("express");
morgan = require("morgan");
const app = express();

app.use(morgan("common"));

app.use(express.static("public"));

let topMovies = [
  {
    title: "Kiki's Delivery Service",
    producer: "Studio Ghibli"
  },
  {
    title: "Princess Mononoke",
    producer: "Studio Ghibli"
  },
  {
    title: "Ponyo",
    producer: "Studio Ghibli"
  },
  {
    title: "Howl's Moving Castle",
    producer: "Studio Ghibli"
  },
  {
    title: "Spirited Away",
    producer: "Studio Ghibli"
  },
  {
    title: "Caslte In the Sky",
    producer: "Studio Ghibli"
  },
  {
    title: "My Neighbor Totoro",
    producer: "Studio Ghibli"
  },
  {
    title: "Nausicaa of the Valley of the Wind",
    producer: "Studio Ghibli"
  },
  {
    title: "The Wind Rises",
    producer: "Studio Ghibli"
  },
  {
    title: "When Marnie Was There",
    producer: "Studio Ghibli"
  }
];

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});
