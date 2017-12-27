/**
 * Non-exhaustive set of tests that ensure that
 * the most important functions work.
 */
if (typeof module !== "undefined") {
   module.exports = {
      smokeTest: smokeTest
   }
}

function smokeTest(cornerstone)
{
   describe("CornerStone", function() {
      it("should get a verse", function(done) {
         done();
      });

      it("should get a chapter", function(done) {
         done();
      });

      it("should get a list of languages", function(done) {
         done();
      });

      it("should get a list of versions", function(done) {
         done();
      });
   });
}
