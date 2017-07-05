const express = require('express');
const http = require("http");
const https = require("https");
const fs = require("fs");

// Retrieve the number of seconds from command line arguments.
//  [0]     [1]       [2]
// node testserver.js  6
var input = Number(process.argv[2]);
var seconds = isNaN(input) ? 5 : input;
console.log("Running for " + seconds + " seconds.");

var app = express();
var secureApp = express();

var httpPort = 3000;
var httpsPort = 3003;

const secureOptions = {
   key: fs.readFileSync("./spec/key.pem"),
   cert: fs.readFileSync("./spec/cert.pem")
};

var server = http.createServer(app);
var secureServer = https.createServer(secureOptions, secureApp);

configureServer(app);
configureServer(secureApp);

function configureServer(app) {
   // Setup headers
   app.use(function(req, res, next) {
      // CORS, allows the browser to make requests
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      // Automatically close connections so that the server can close.
      res.set("Connection", "close");
      next();
   });

   // Send an http request to http://localhost:<port>/shutdown to
   // shutdown the server.
   app.get('/shutdown', (req, res) => {
      res.send("Shutting down...");
      server.close();
   });

   // To force a fail, request http://localhost:<port>/fail?code=<number>&message=<message>
   app.all('/fail', (req, res) => {
      var message = req.query.message || "Resource not found.";
      var failCode = req.query.code || 404;
      res.status(failCode);
      res.send(message);
   });

   // JSONP
   app.get('/jsonp', (req, res) => {
      var obj = {message: "helloworld"};
      res.jsonp(obj);
   });

   // GET dynamic response, returns the path passed in.
   // For example, http://localhost:<port>/helloworld returns helloworld.
   app.get('/*', (req, res) => {
      res.send(req.params[0]);
   });

   // POST dynamic response, requests return the path passed in plus "post"
   app.post('/*', (req, res) => {
      res.send(req.params[0] + "post");
   });
}

server.listen(httpPort, () => {
  console.log("HTTP: Listening on port " + httpPort);
});

secureServer.listen(httpsPort, () => {
   console.log("HTTPS: Listening on port " + httpsPort);
});

setTimeout(() =>
{
   console.log("Closing servers");
   server.close();
   secureServer.close();
}, seconds*1000);
