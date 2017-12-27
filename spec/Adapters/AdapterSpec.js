// src file
const getAdapters = require("../../" + generatedJsPath + "adapters/AdapterList.js").default;
const adapters = getAdapters();

// dependencies
const Logger = require("../../" + generatedJsPath + "stubs/LoggerStub.js").default;
const WebGetter = require("../../" + generatedJsPath + "stubs/WebGetterStub.js").default;

const logger = new Logger();
const webGetter = new WebGetter(logger);

describe("Adapters", () => {

   adapters.forEach((Adapter) => {
      const adapter = new Adapter(logger, webGetter);
      describe(adapter.getName(), () => {
         beforeEach(() => {
         });

         it("should have a name", () => {
            expect(adapter.getName().trim()).not.toEqual("");
         });

         it("should have a terms URL", () => {
            expect(adapter.getTermsUrl().trim()).not.toEqual("");
         });

         it("should get a verse", () => {
            adapter.getVerse(18, 3, "John").then((data) => {
               expect(data).toEqual("http://getbible.net/json?passage=John3:16");
            });
         });
      });
   });
});
