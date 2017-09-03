// src file
const Settings = require("../../" + generatedJsPath + "cornerstone/Settings.js").default;

// dependencies
const Logger = require("../../" + generatedJsPath + "cornerstone/Logger.js").default;
const LoggingLevel = require("../../" + generatedJsPath + "cornerstone/CommonEnums.js");
const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const logger = new Logger({
   loggingEnabled: false
});

describe("Settings", () => {
   it("should contain all configurable settings", sinonTest(function() {
      let settings = new Settings(logger, {
         "loggingEnabled": true,
         "loggingLevel": "WARN",
         "maxCacheSize": 3,
         "maxCacheValue": 10,
         "dummyVar": 2
      });
   }));
});
