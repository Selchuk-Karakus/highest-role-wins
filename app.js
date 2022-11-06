const express = require("express");
const app = express();
const PORT = 8080;
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

app.post("/login", (req, res) => {
  let userName = req.body.username;
  let password = req.body.password;
  console.log(`Username: ${userName} Password: ${password}`);
  res.json({ status: true });
});

app.listen(PORT, () => {
  console.log("Listening to server on ", +PORT);
});
