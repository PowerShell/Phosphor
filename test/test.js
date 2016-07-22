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
        // this is should.js syntax, very clear
        console.log(err);
        done();
    });
   });

   it('should return items from noun items based on noun', function(done) {

     request(url)
     .get('/nounitems?noun=service')
     .expect('Content-Type', /json/)
     .end(function(err, res) {
       if (err) {
         throw err;
       }

       console.log(err);
       done();
     })
   })
});
