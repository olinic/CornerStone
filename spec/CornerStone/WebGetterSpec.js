// src file
const BrowserWebGetter = require("../../" + generatedJsPath + "cornerstone/BrowserWebGetter.js").default;
const NodeWebGetter = require("../../" + generatedJsPath + "cornerstone/NodeWebGetter.js").default;

// dependencies
const Logger = require("../../" + generatedJsPath + "cornerstone/Logger.js").default;

const logger = new Logger({ loggingEnabled: false });
const httpPort = 3000;
const httpsPort = 3003;

const browserGetter = new BrowserWebGetter(logger);
const nodeGetter = new NodeWebGetter(logger);

inBrowser(() => { testWebGetter("Browser Web Getter", browserGetter); });
inNode(() => { testWebGetter("Node Web Getter", nodeGetter); });

function testWebGetter(name, webGetter) {
   describe(name, () => {
      let responseText;
      let method;
      let baseUrl;
      let port;
      let urlPath;


      function testRequest(method, urlPath, baseUrl, port) {
         return webGetter.request({
            method: method,
            url: testServerUrl(urlPath, baseUrl, port),
         });
      }

      function expectGoodPromise(promise, expectedText, done) {
         promise.then((response) => {
            expect(response).toEqual(expectedText);
            done();
         }).catch((err) => {
            fail(err);
            done();
         });
      }

      function expectBadPromise(promise, done) {
         promise.then(() => {
            fail("Promise should not have succeeded.");
            done();
         }).catch((err) => {
            // check that an Error is provided
            expect(err instanceof Error).toBeTruthy();
            done();
         });
      }

      beforeEach(() => {
         // Set variables to defaults before each test
         responseText = "verse";
         method = "GET";
         baseUrl = "http://localhost";
         port = 3000;
         urlPath = "";
         process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
      });

      it("should GET an online resource", (done) => {
         urlPath = responseText;
         let webPromise = testRequest(method, urlPath, baseUrl, port);
         expectGoodPromise(webPromise, responseText, done);
      });

      it("should GET an online resource securely (HTTPS)", (done) => {
         process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
         baseUrl = "https://localhost";
         port = httpsPort;
         urlPath = responseText;

         let webPromise = testRequest(method, urlPath, baseUrl, port);

         webPromise.then((response) => {
            expect(response).toEqual(responseText);
            done();
         });
      });

      it("should retrieve an online resource via POST", (done) => {
         // Note: server will return the path + post
         urlPath = "text";
         responseText = urlPath + "post";
         method = "POST";

         let webPromise = testRequest(method, urlPath, baseUrl, port);
         expectGoodPromise(webPromise, responseText, done);
      });

      function jsonpTest(urlParam, shouldPass, done)
      {
         responseText = '{"message":"helloworld"}';
         method = "JSONP";
         urlPath = urlParam;

         let webPromise = testRequest(method, urlPath);

         if (shouldPass) {
            expectGoodPromise(webPromise, responseText, done);
         } else {
            expectBadPromise(webPromise, done);
         }
      }

      it("should retrieve an online resource via JSONP with a specified callback", (done) => {
         jsonpTest("jsonp?callback=getVerse", true, done);
      });

      it("should retrieve an online resource via JSONP with no specified callback", (done) => {
         jsonpTest("jsonp", true, done);
      });

      it("should fail gracefully when using JSONP", (done) => {
         jsonpTest("fail", false, done);
      });

      it("should fail gracefully (the Promise way)", (done) => {
         responseText = "failure_text";
         urlPath = "fail?code=404&message=" + responseText;
         method = "POST";

         let webPromise = testRequest(method, urlPath, baseUrl, port);
         expectBadPromise(webPromise, done);
      });
   });
}

// Returns the url for the test server. baseUrl and port are optional.
function testServerUrl(urlEnd, baseUrl, port) {
   let urlBase = (typeof baseUrl === 'string') ? baseUrl : "http://localhost";
   let urlPort = (typeof port === 'number') ? port : httpPort;
   return (urlBase + ":" + urlPort + "/" + urlEnd);
}
