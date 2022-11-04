const express = require("express");
const app = express();
const PORT = 8080;
const usersData = require("./data/users-data.json");
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.send(__dirname + "index.html");
});

app.get("/users", (req, res) => {
  res.send(usersData);
});

app.listen(PORT, () => {
  console.log("Listening to server on ", +PORT);
});
