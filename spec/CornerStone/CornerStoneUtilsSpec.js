
const multiReplace = require("../../" + generatedJsPath + "utilities/CornerStoneUtils.js").multiReplace;

describe("CornerStone Utils", () => {
   describe("multiReplace", () => {
      it("should replace multipe needles", () => {
         let needles = ["test", "hello", "world"];
         let haystack = "hello there, this is our way of testing the world.";
         expect(multiReplace(haystack, needles, "check")).toEqual("check there, this is our way of checking the check.");
      });
   });
});
