const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const socket = require("socket.io")(http);
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
    players.push({
      id,
      name,
      round,
      roll: null,
      winner: false,
    });
    socket.emit("players", players);
  });
});

const server = http.listen(PORT, () => {
  console.log("Listening to server on ", +PORT);
});
