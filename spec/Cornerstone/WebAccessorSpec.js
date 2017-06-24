var sinon;
var Web;

inNode(function() {
  // dependencies
  sinon = require("sinon");

  // src file
  Web = require('../../js/cornerstone/WebAccessor.js');
});

inBrowser(function() {
  Web = {};
  Web.request = request;
});

// Setup before each spec
beforeAll(function() {

});

// Tear down
afterAll(function() {

});

describe("Web Accessor", function() {
  // test each platform
  inNode(function() {
    describe("when using node", function() {
      beforeEach(function() {
        // http
      })

      testWebGet();
    });

    describe("when using Qt", function() {
      beforeEach(function() {
        // Qt, setTimeout
      });
    });
  });

  inBrowser(function() {
    describe("when using the browser", function() {
      beforeEach(function() {
        // XMLHttpRequest
      });
      testWebGet();
    });
  });

  function testWebGet() {
    it("should be able to GET an online resource", function(done) {
      var responseText = "verse";

      var webPromise = Web.request({
        method: "GET",
        url: "http://localhost:3001/verse",
      });

      webPromise.then(function(response) {
        expect(response).toEqual(responseText);
        done();
      }).catch(function(err) {
        console.log(err);
      })
    });
  }
});
