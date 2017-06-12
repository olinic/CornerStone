var express = require('express');

var app = express();
var port = 3000;

var server = app.listen(port, function() {
  console.log("Listening on port " + port);
});

app.get('/shutdown', function (req, res) {
  res.send("Shutting down...");
  server.close();
});

app.get('/*', function (req, res) {
  res.send(req.params[0]);
});
