// Executes the Node smoke test.
const smokeTest = require("./SmokeTest.js").smokeTest;
var CornerStone = require(nodeProjectLatestPath + "/" + nodeProjectLatestFile);

try {
   smokeTest(CornerStone.New({logging: false, loggingLevel: "info"}));
} catch (err) {
   console.log(err);
}
