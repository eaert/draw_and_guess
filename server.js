const express = require('express');
var bodyParser = require('body-parser')
const path = require("path");
const session = require("client-sessions");
var cors = require("cors");

const app = express();
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

const port = process.env.PORT || 5000;

app.use(express.static("client/build"));
app.use(express.static("public"));

// Set cookie session
app.use(
    session({
      cookieName: "session",
      secret: 'secret',
      cookie: {
        httpOnly: false,
        secure: false,
      },
    })
  );

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// require routes
const game = require("./routes/game");
const user = require("./routes/user");

// middleware to routes
app.use("/game", game);
app.use("/user", user);

app.get("/alive", (req, res) => res.send("I'm alive"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.message);
  });