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
         cornerstone.getVerse({book: "John", chapter: 3, verse: 16})
         .then(function(verse) {
            expect(verse).toEqual("For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.");
            done();
         })
         .catch(function(err) {
            fail(err);
            done();
         });
      });

      /*it("should get a chapter", function(done) {
         done();
      });

      it("should get a list of languages", function(done) {
         done();
      });

      it("should get a list of versions", function(done) {
         done();
      });*/
   });
}
