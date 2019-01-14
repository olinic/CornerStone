const Jasmine = require('jasmine');
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

jasmine.execute();
