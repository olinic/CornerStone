var sinon;
var express;
var Web;
var app;
var port;
var server;

inNode(function() {
  // dependencies
  sinon = require("sinon");
  express = require('express');

  // src file
  Web = require('../../js/cornerstone/WebAccessor.js');

  app = express();
  port = 3000;
  server;
});

inBrowser(function() {
  Web = {};
  Web.request = request;
});

// Setup before each spec
beforeAll(function() {
  console.log("hello")
  inNode(function() {
    // start server
    server = app.listen(port, function() {
      console.log("Listening on port " + port);
    });

    // respond with provided path
    app.get('/*', function (req, res) {
      res.send(req.params[0]);
    });
  });
});

// Tear down
afterAll(function() {
  inNode(function() {
    // shutdown the server
    server.close();
  });
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
        url: "http://localhost:3000/verse",
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
