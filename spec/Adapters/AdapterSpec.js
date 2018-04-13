// src file
const onlineAdapters = require("../../" + generatedJsPath + "adapters/AdapterList.js").onlineAdapters;
const OnlineAdapter = require("../../" + generatedJsPath + "cornerstone/OnlineAdapter").default;
const validBookIds = require("../../" + generatedJsPath + "interfaces/ICornerStone.js").validBookIds;

// dependencies
//const Logger = require("../../" + generatedJsPath + "stubs/LoggerStub.js").default;
const Logger = require("../../" + generatedJsPath + "cornerstone/Logger.js").default;
const LoggingLevel = require("../../" + generatedJsPath + "cornerstone/CommonEnums.js").LoggingLevel;
const isNode = require("../../" + generatedJsPath + "cornerstone/Platform.js").isNode;
const WebGetter = (isBrowser()) ?
      require("../../" + generatedJsPath + "cornerstone/BrowserWebGetter.js").default :
      require("../../" + generatedJsPath + "cornerstone/NodeWebGetter.js").default;

const Book = require("../../" + generatedJsPath + "cornerstone/CommonEnums.js").Book;

const logger = new Logger({
      loggingEnabled: false,
      loggingLevel: LoggingLevel.DEBUG});
const webGetter = new WebGetter(logger);

let adapters = [];
for (let i = 0; i < onlineAdapters.length; i++) {
   adapters.push(new OnlineAdapter(logger, webGetter, onlineAdapters[i]));
}

/**
 * Short book names (as short as possible, but long enough to validate)
 * to verify that books are correct and in the
 * corresponding position/index.
 */
let shortBookNames = [
   "gn",
   "ex",
   "lv",
   "nm",
   "de",
   "js",
   "jd",
   "r",
   "1s",
   "2s",
   "1k",
   "2k",
   "1c",
   "2c",
   "ez",
   "nh",
   "es",
   "jb",
   "ps",
   "pr",
   "ec",
   "so",
   "is",
   "jr",
   "la",
   "ez",
   "dn",
   "hs",
   "jo",
   "am",
   "ob",
   "jn",
   "mc",
   "na",
   "ha",
   "ze",
   "ha",
   "zc",
   "ml",
   "mt",
   "mr",
   "lk",
   "jh",
   "ac",
   "rm",
   "1c",
   "2c",
   "gl",
   "ep",
   "ph",
   "co",
   "1t",
   "2t",
   "1t",
   "2t",
   "ti",
   "ph",
   "hb",
   "js",
   "1p",
   "2p",
   "1j",
   "2j",
   "3j",
   "ju",
   "rv"
];

function compare(a, b)
{
   return (a.toLowerCase() === b.toLowerCase());
}

function checkCharacters(specialNeedle, haystack)
{
   // Check that haystack starts with the special needle and
   // the subsequent characters exist in the haystack.
   let status = false;
   // check first character
   if (specialNeedle.length > 0 && haystack.length > 0 &&
      (compare(specialNeedle.charAt(0), haystack.charAt(0)))) {
      let nIndex = 1;
      let hIndex = 1;
      // continue if first characters match
      for (; nIndex < specialNeedle.length && hIndex < haystack.length; nIndex++) {
         // move hIndex if characters don't match
         for (; hIndex < haystack.length &&
                compare(specialNeedle.charAt(nIndex), haystack.charAt(hIndex)); hIndex++) {}
         // move nIndex on match
      }
      // success if nIndex is at end
      status = (nIndex === specialNeedle.length);
   }
   return status;
}

describe("Adapters", () => {

   describe("Valid Books", () => {
      it("should have correct names and position", () => {
         // if false, check shortBookNames
         expect(validBookIds.length).toEqual(shortBookNames.length);
         for (let bookIndex = 0; bookIndex < validBookIds.length; bookIndex++) {
            if (!checkCharacters(shortBookNames[bookIndex], validBookIds[bookIndex][0])) {
               fail(shortBookNames[bookIndex] + " does not match " + validBookIds[bookIndex][0]);
            }
         }
      });
   });

   adapters.forEach((adapter) => {
      describe(adapter.getName(), () => {
         beforeEach(() => {
         });

         it("should have a name", () => {
            expect(adapter.getName().trim()).not.toEqual("");
         });

         it("should have a terms URL", () => {
            expect(adapter.getTermsUrl().trim()).not.toEqual("");
         });

         it("should have a text format", () => {
            let format = adapter.getTextFormat();
            expect(0 <= format && format <= 3).toBeTruthy();
         });

         it("should get a verse", (done) => {
            adapter.getVerse({ book: Book.JOHN, chapter: 3, verse: 18 }).then((data) => {
               let text = "He that believeth on him is not condemned: but he that " +
                  "believeth not is condemned already, because he hath not believed " +
                  "in the name of the only begotten Son of God.";
               expect(data.verses[0].text.trim()).toEqual(text);
               done();
            }).catch((err) => {
               fail(err);
               done();
            });
         });

         it("should get a chapter", (done) => {
            adapter.getChapter({ book: Book.PS, chapter: 117 }).then((data) => {
               expect(data.verses.length).toEqual(2);
               done();
            }).catch((err) => {
               fail(err);
               done();
            });
         });

         it("should have correct book names and position", () => {
            expect(adapter.myBooks.length).toEqual(shortBookNames.length);
            for (let bookIndex = 0; bookIndex < adapter.myBooks.length; bookIndex++) {
               if (!checkCharacters(shortBookNames[bookIndex], adapter.myBooks[bookIndex])) {
                  fail(shortBookNames[bookIndex] + " does not match " + adapter.myBooks[bookIndex]);
               }
            }
         });

         // Test that the adapter returns verses in the format defined in the adapter.
      });
   });
});
