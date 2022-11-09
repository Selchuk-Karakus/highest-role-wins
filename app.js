const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http);
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

io.on("connection", (socket) => {
  socket.on("new player", (id, name) => {
    userId = {
      id,
      name,
      round,
      roll: null,
      winner: false,
    };
    players.push(userId);
    io.emit("players", players);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason)
    players = players.filter((player) => {
      return players !== userId;
    });
  });

  socket.on("roll", () => {
    userId.roll = lodash.random(1, 1000);
    console.log(userId);
  });
  io.emit("players", players);
});

const server = http.listen(PORT, () => {
  console.log("Listening to server on ", +PORT);
});
