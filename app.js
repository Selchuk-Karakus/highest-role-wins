const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const socket = require("socket.io")(http);
const lodash = require("lodash");

let players = [];
let round = 0;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

socket.on("connection", (socket) => {
  socket.on("new player", (id, name) => {
    userId = {
      id,
      name,
      round,
      roll: null,
      winner: false,
    };
    players.push(userId);
    socket.emit("players", players);
  });

  socket.on("disconnect", (reason) => {
    players = players.filter((player) => {
      return players !== userId;
    });
    socket.emit("players", players);
  });

  socket.on("roll", () => {
    userId.roll = lodash.random(1, 1000);
    console.log(userId);
  });
  socket.emit("players", players);
});

const server = http.listen(PORT, () => {
  console.log("Listening to server on ", +PORT);
});
