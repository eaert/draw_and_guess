const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('client/build'));
app.use(express.static("public"));
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// app.use((req, res, next) => {
//     res.sendFile(__dirname + "/client/build/index.html");
// });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

app.get("/test", (req, res) => {
    console.log('index been sent.')
});