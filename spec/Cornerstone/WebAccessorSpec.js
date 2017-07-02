var sinon;
var Web;
var port = 3000;

// dependencies
sinon = require("sinon");

// src file
Web = require('../../js/cornerstone/WebAccessor.js');

describe("Web Accessor", function() {
   it("should be able to GET an online resource", function(done) {
      var responseText = "verse";

      var webPromise = Web.request({
         method: "GET",
         url: testServerUrl(responseText),
      });

      webPromise.then(function(response) {
         expect(response).toEqual(responseText);
         done();
      });
   });

   it("should be able to retrieve an online resource via POST", function(done) {
      // Note: server will return the path + post
      var urlPath = "text"
      var responseText = urlPath + "post";

      var webPromise = Web.request({
         method: "POST",
         url: testServerUrl(urlPath),
      });

      webPromise.then(function(response) {

         expect(response).toEqual(responseText);
         done();
      });
   });

   function jsonpTest(urlParam, shouldPass, done)
   {
      var responseText = "helloworld";

      var webPromise = Web.request({
         method: "JSONP",
         url: testServerUrl(urlParam),
      });

      webPromise.then(function(response) {
         if (shouldPass) {
            var json = JSON.parse(response);
            expect(json.message).toEqual(responseText);
         }
         else {
            fail("Supposed to fail.")
         }
         done();
      }).catch(function(err) {
         if (shouldPass) {
            fail(err);
         }
         else {
            expect(err).toBeDefined();
         }
         done();
      });
   }

   it("should be able to retrieve an online resource via JSONP with a specified callback", function(done) {
      jsonpTest("jsonp?callback=getVerse", true, done);
   });

   /*it("should be able to retrieve an online resource via JSONP with no specified callback", function(done) {
      jsonpTest("jsonp", true, done);
   });*/

   it("should fail gracefully (the Promise way)", function(done) {
      var responseText = "failure_text";

      var webPromise = Web.request({
         method: "POST",
         url: testServerUrl("fail?code=404&message=" + responseText),
      });

      webPromise.then(function(response) {
         fail("Promise succeeded on a bad request.")
         done();
      }).catch(function(err) {
         expect(err).toBeDefined();
         done();
      });
   });
});

// Returns the url for the test server. baseUrl and port are optional.
function testServerUrl(urlEnd, baseUrl, port) {
   var urlBase = (typeof baseUrl === 'string') ? baseUrl : "http://localhost";
   var urlPort = (typeof port === 'number') ? port : 3000;
   return (urlBase + ":" + urlPort + "/" + urlEnd);
}
