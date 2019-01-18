/* 
 * Usage:
 * node testserver.js <time in sec> 
 */
const express = require('express');
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const serverConfig = require(".." + path.sep + "serverConfig.json");

const defaultTime = 5;

// Retrieve the number of seconds from command line arguments.
//  [0]     [1]       [2]
// node testserver.js  6
const script = process.argv[1];
const input = Number(process.argv[2]);
const seconds = isNaN(input) ? defaultTime : input;
console.log("Running for " + seconds + " seconds.");

var app = express();
var secureApp = express();

var httpPort = serverConfig.httpPort;
var httpsPort = serverConfig.httpsPort;

const dir = path.dirname(script);

const secureOptions = {
   key: fs.readFileSync(dir + path.sep + "key.pem"),
   cert: fs.readFileSync(dir + path.sep + "cert.pem")
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

   // Send an http request to http://127.0.0.1:<port>/shutdown to
   // shutdown the server.
   app.get(serverConfig.shutdown, (req, res) => {
      res.send("Shutting down...");
      shutdown();
   });

   // To force a fail, request http://127.0.0.1:<port>/fail?code=<number>&message=<message>
   app.all(serverConfig.fail, (req, res) => {
      var message = req.query.message || "Resource not found.";
      var failCode = req.query.code || 404;
      res.status(failCode);
      res.send(message);
   });

   // JSONP
   app.get(serverConfig.jsonp, (req, res) => {
      var obj = {message: "helloworld"};
      res.jsonp(obj);
   });

   // GET dynamic response, returns the path passed in.
   // For example, http://127.0.0.1:<port>/helloworld returns helloworld.
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

var timer = setTimeout(() =>
{
   shutdown()
}, seconds*1000);

function shutdown()
{
   console.log("Closing servers");
   server.close();
   secureServer.close();
   clearTimeout(timer);
}

