const express = require("express");
const app = express();
const PORT = 8080;
const usersData = require("./data/users-data.json");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  res.send(usersData);
});

app.listen(PORT, () => {
  console.log("Listening to server on ", +PORT);
});
