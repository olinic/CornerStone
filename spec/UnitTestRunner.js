const fs = require('fs');
const { spawn } = require('child_process');
const Jasmine = require('jasmine');

//------------------------------------------------------------------------------
// Setup server
const serverOutFile = "./out.log";
const out = fs.openSync(serverOutFile, 'w');
const err = fs.openSync(serverOutFile, 'w');
console.log("Look at " + serverOutFile + " for server output.");

const serverDuration = 15; // in seconds

// Start server in background
const subprocess = spawn('node', ['./ExpressServer/server.js', serverDuration], {
  detached: true,
  stdio: [ 'ignore', out, err ]
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

// Start Jasmine
jasmine.execute();
