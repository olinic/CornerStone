var express = require('express');
var http = require("http");

var seconds = process.argv[2] || 5;
console.log("Running for " + seconds + " seconds.");

var app = express();
var port = 3001;
var server = http.createServer(app);

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.set("Connection", "close");
   next();
});

// Send an http request to http://localhost:<port>/shutdown to
// shutdown the server.
app.get('/shutdown', function (req, res) {
   res.send("Shutting down...");
   server.close();
});

app.get('/*', function (req, res) {
   res.send(req.params[0]);
});

server.listen(port, function() {
  console.log("Listening on port " + port);
});

setTimeout(()=>
{
   console.log("Closing server");
   server.close();
}, seconds*1000);
