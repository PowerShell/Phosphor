var assert = require('chai').assert;
var request = require('supertest');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});


describe('routes', function() {

  this.timeout(0);

  var url = 'localhost:3000';

  it('should return a basic json file from the route /test', function(done) {
    // once we have specified the info we want to send to the server via POST verb,
    // we need to actually perform the action on the resource, in this case we want to
    // POST on /api/profiles and we want to send some info
    // We do this using the request object, requiring supertest!

    console.log(request(url).get('/test'));

    request(url)
    .get('/test')
      // end handles the response
    .expect('Content-Type', /json/)
    .end(function(err, res) {
        if (err) {
          throw err;
        }

        done();
    });
   });

   it('should return items from noun items based on noun', function(done) {

     request(url)
     .get('/nounitems?noun=service')
     .expect('Content-Type', /json/)
     .expect(function(res) {
       var data = res.body;

       for (var i = 0; i < data.length; i++) {
         if (data[i].includes("Status") && data[i].includes("Name") && data[i].includes("DisplayName")) {
           console.log("passed");
           return "correct";
         }
       }

       throw new Error("Error: services not called");
     })
     .end(function(err, res) {
       if (err) {
         throw err;
       }

       done();
     });
   });

   it('should return verbs for service', function(done) {

     request(url)
     .get('/verbs?noun=Service')
     .expect(function(res) {
       var verbs = ['Get', 'New', 'Restart', 'Resume', 'Set', 'Start', 'Stop', 'Suspend'];
       var result = res.body;

       console.log("result:" + result);

       for (var i = 0; i < result.length; i++) {
         if (result[i] != null && verbs.indexOf(result[i]) === -1) {
           throw new Error("Not all verbs for service found");
         }
       }
     })
     .end(function(err, res) {
       if (err) {
         throw err;
       }

       done();
     });
   });

   it('should return verbs for package', function(done) {

     request(url)
     .get('/verbs?noun=Package')
     .expect(function(res) {
       var verbs = ['Get', 'Find', 'Install', 'Save', 'Uninstall'];
       var result = res.body;

       console.log("result:" + result);

       for (var i = 0; i < result.length; i++) {
         if (result[i] != null && verbs.indexOf(result[i]) === -1) {
           throw new Error("Not all verbs for package found");
         }
       }
     })
     .end(function(err, res) {
       if (err) {
         throw err;
       }

       done();
     });
   });

   it('should do something', function(done) {

     request(url)
     .get('')
     .expect(function(res) {

     })
     .end(function(err, res) {

     });

     done();

   });

   it('boilerplate', function(done) {

     request(url)
     .get('')
     .expect(function(res) {

     })
     .end(function(err, res) {

     });

     done();

   });

});
