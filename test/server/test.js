var assert = require('chai').assert;
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

routes = require '../src/routes'

describe('routes', function() {
    describe('#show_create_user_screen', function() {
      it('should be a function', function() {
        routes.show_create_user_screen.should.be.a["function"];
      });
      it('should return something cool', function() {
        var mockReq = null;
        var mockRes = {
          render: function(viewName) {
            viewName.should.exist;
            viewName.should.match(/createuser/);
          }
        };
        routes.show_create_user_screen(mockReq, mockRes);
      });
    });
  });
