// src file
const SmartGetter = require("../../" + generatedJsPath + "cornerstone/SmartGetter.js").default;

// dependencies
const LocalCache = require("../../" + generatedJsPath + "cornerstone/Cache.js").default;
const Logger = require("../../" + generatedJsPath + "cornerstone/Logger.js").default;
const WebAccessor = require("../../" + generatedJsPath + "cornerstone/WebAccessor.js").default;
const sinon = require("sinon");
const http = require("http");

const logger = new Logger({ loggingEnabled: false });
const webGetter = new WebAccessor(logger);
const cache = new LocalCache(logger);

const smartGetter = new SmartGetter(logger, cache, webGetter);

describe("Smart Getter", () => {

   it("should return the correct values for multiple calls", (done) => {
      let promises = [];
      let response = "hello";
      let numIterations = 5;
      for (let i=0; i < numIterations; i++) {
         promises[i] = smartGetter.request({
            "url": "http://localhost:3000/" + response,
            "method": "GET"
         });

         promises[i].then((data) => {
            expect(data).toEqual(response);
            if (i == numIterations-1) {
               done();
            }
         }).catch((err) => {
            fail(err);
         });
      }
   });

   it("should gracefully fail for multiple bad calls", (done) => {
      let promises = [];
      let numIterations = 5;
      let failMessage = "didNotWork";
      for (let i=1; i <= numIterations; i++) {
         promises[i] = smartGetter.request({
            "url": "http://localhost:3000/fail?code=500&message=" + failMessage,
            "method": "GET"
         });

         promises[i].then(() => {
            fail("Should not have succeeded");
         }).catch((err) => {
            expect(err instanceof Error).toBeTruthy();
            if (i == numIterations) {
               done();
            }
         });
      }
   });

   // for some reason, if this is above the other tests, they will fail.
   // sinon.test automatically cleans up.
   // sinon.test requires "function". Do not use the arrow function.
   it("should call http or XMLHttpRequest only once for a resource.", () => {
      if (isBrowser()) {
         sinon.spy(window, "XMLHttpRequest");
      } else {
         sinon.spy(http, "request");
      }

      for (let i=0; i < 4; i++) {
         smartGetter.request({
            "url": "http://localhost:3000/test",
            "method": "GET"
         });
      }

      inNode(() => {
         expect(http.request.calledOnce).toBeTruthy();
      });
      inBrowser(() => {
         expect(XMLHttpRequest.calledOnce).toBeTruthy();
      });
   });
});
