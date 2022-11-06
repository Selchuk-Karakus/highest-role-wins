const express = require("express");
const app = express();
const PORT = 8080;
const usersData = require("./data/users-data.json");
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/users", (req, res) => {
  res.send(usersData);
});

app.listen(PORT, () => {
  console.log("Listening to server on ", +PORT);
});
