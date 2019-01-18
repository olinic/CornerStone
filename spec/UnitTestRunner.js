const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const Jasmine = require("jasmine");
const opn = require("opn");
const http = require("http");

const dir = path.dirname(process.argv[1]);
const serverConfig = require(dir + path.sep + "serverConfig.json");
const expressDir = dir + path.sep + serverConfig.dir;

//------------------------------------------------------------------------------
// Setup server
const serverOutFile = expressDir + path.sep + "out.log";
const out = fs.openSync(serverOutFile, "w");
const err = fs.openSync(serverOutFile, "w");
console.log("Look at " + serverOutFile + " for server output.");

const serverDuration = 45; // in seconds

// Start server in background
const subprocess = spawn("node", [expressDir + path.sep + "server.js", serverDuration], {
  detached: true,
  stdio: [ "ignore", out, err ]
});

//------------------------------------------------------------------------------
// Setup Jasmine
let jasmine = new Jasmine();
jasmine.loadConfig(
   {
     "spec_dir": "spec",
     "spec_files": [
       "Adapters/*Spec.js",
       "CornerStone/*Spec.js"
     ],
     "helpers": [
       "helpers/**/*.js"
     ],
     "stopSpecOnExpectationFailure": false,
     "random": true
   }
);

const executeJasmine = new Promise( (resolve,reject) => {
   jasmine.execute();
   jasmine.onComplete(function(status) {
      // status is true if all specs are passed
      // false otherwise
      resolve(status);
   });

});

//------------------------------------------------------------------------------
// Start Jasmine
executeJasmine.then((passed) => {
   if(passed) {
      // Start Brower Tests
      const executeBrowserTests = opn(dir + path.sep + "SpecRunner.html", {wait: true});
      executeBrowserTests.then(function() {
         console.log("Shutting down server");
         http.get({
            host: serverConfig.host,
            port: serverConfig.httpPort,
            path: "/shutdown",
            timeout:1000
         });
      });
   }
})

