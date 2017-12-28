// Executes the Node smoke test.
const smokeTest = require("./SmokeTest.js").smokeTest;
var CornerStone = require(projectLatestPath + "/" + projectLatestFile);

smokeTest(CornerStone.New());
