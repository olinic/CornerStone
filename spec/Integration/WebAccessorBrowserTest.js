describe("Web Accessor", function() {

  // Setup before each spec
  beforeAll(function() {
  });

  // Tear down
  afterAll(function() {

  });


  describe("when using the browser", function() {
    beforeEach(function() {
      // XMLHttpRequest
    });
    it("should work", function() {
      expect(24*2).toEqual(48);
    });

    testWebGet();
  });

  describe("when using Qt", function() {
    beforeEach(function() {
      // Qt, setTimeout
    });


  });

  function testWebGet() {
    it("should be able to GET an online resource", function(done) {
      var responseText = "verse";

      var webPromise = request({
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
