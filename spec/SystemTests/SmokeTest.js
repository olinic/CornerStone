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
         .then(function(data) {
            expect(data.verses[0].text).toContain("For God so loved the world,");
            done();
         })
         .catch(function(err) {
            fail(err);
            done();
         });
      });

      it("should get a chapter", function(done) {
         cornerstone.getChapter({book: "Matt", chapter: 28})
         .then(function(data) {
            expect(data.verses.length).toEqual(20);
            done();
         })
         .catch(function(err) {
            fail(err);
            done();
         });
      });
/*
      it("should get a list of languages", function(done) {
         done();
      });

      it("should get a list of versions", function(done) {
         done();
      });*/
   });
}
