const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const socket = require("socket.io")(http);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

socket.on("connection", (e) => {
  console.log("Ready to use socket");
  e.on("player", (id) => {
    console.log(id);
  });
});

const server = http.listen(PORT, () => {
  console.log("Listening to server on ", +PORT);
});
