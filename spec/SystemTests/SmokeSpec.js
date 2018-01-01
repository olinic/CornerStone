// Executes the Node smoke test.
const smokeTest = require("./SmokeTest.js").smokeTest;
var CornerStone = require(nodeProjectLatestPath + "/" + nodeProjectLatestFile);

smokeTest(CornerStone.New());
