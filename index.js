const express = require("express");
morgan = require("morgan");
const app = express();

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

app.get("/secreturl", (req, res) => {
  res.send("This is a secret url with very top-secret content.");
});
