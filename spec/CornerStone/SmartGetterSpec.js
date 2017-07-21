// src file
const smartGetter = require("../../" + generatedJsPath + "cornerstone/SmartGetter.js");
smartGetter.request = smartGetter.default;

// dependencies
const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);
const http = require("http");


describe("Smart Getter", () => {

   // sinon.test automatically cleans up.
   // sinon.test requires "function". Do not use the arrow function.
   it("should call http or XMLHttpRequest only once for a resource.", sinonTest(function() {
      let spy;
      inNode(() => {
         spy = sinon.spy(http, "request");
      });
      inBrowser(() => {
         spy = sinon.spy(window, "XMLHttpRequest");
      });

      for (let i=0; i < 3; i++) {
         smartGetter.request({
            "url": "http://localhost:3000/test",
            "method": "GET"
         });
      }

      inNode(() => {
         expect(http.request.calledOnce).toBeTruthy();
      });
      inBrowser(() => {
         console.log("just checking");
         expect(XMLHttpRequest.calledOnce).toBeTruthy();
      });
   }));

   it("should return the correct values for multiple calls", (done) => {
      let promises = [];
      let response = "hello"
      let numIterations = 5;
      for (let i=1; i <= numIterations; i++) {
         promises[i] = smartGetter.request({
            "url": "http://localhost:3000/" + response,
            "method": "GET"
         });
         promises[i].then((data) => {
            expect(data).toEqual(response);
            if (i == numIterations) {
               done();
            }
         });
      }
   });
});
