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
    console.log(reason);
    players = players.filter((player) => {
      return player !== userId;
    });
    io.emit("players", players);
  });

  socket.on("roll", () => {
    userId.roll = lodash.random(1, 1000);
    console.log(userId);
    nextRoundCheck();
  });
  io.emit("players", players);

  const nextRoundCheck = () => {
    if (players.length > 0) {
      let ready = 0;
      let top = 0;
      let win = 0;

      players.forEach((player, index) => {
        player.winner = false;
        if (player.roll) {
          ready++;
          if (player.roll && player.roll > top) {
            win = index;
            top = player.roll;
          }
        }
      });
      players[win].winner = true;
      io.emit("players", players);

      if (ready >= players.length) {
        io.emit("inplay", `Round ${round} winner is ${players[win].name}`);
        round++;

        players.forEach((player, index) => {
          player.winner = false;
          player.roll = null;
          player.round = round;
        });
      }
    }
  };
});

const server = http.listen(PORT, () => {
  console.log("Listening to server on ", +PORT);
});
