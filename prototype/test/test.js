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

   it('should return hello from the route /test', function(done) {

     request(url)
     .get('/test')
     .expect(function(res) {
       var result = res.body;

       if (result !== "hello") {
         throw new Error("Invalid response from /test");
       }
     })
     .end(function(err, res) {

     });

     done();

   });

   it('should return items from noun items of service', function(done) {

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

   it('should return items from noun items of module', function(done) {

     request(url)
     .get('/nounitems?noun=module')
     .expect('Content-Type', /json/)
     .expect(function(res) {
       var data = res.body;

       for (var i = 0; i < data.length; i++) {
         if (data[i].includes("ModuleType") && data[i].includes("Name") && data[i].includes("Version") && data[i].includes("ExportedCommands")) {
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

   it('should return verbs for module', function(done) {

     request(url)
     .get('/verbs?noun=Module')
     .expect(function(res) {
       var verbs = ['Find', 'Install', 'Publish', 'Save', 'Uninstall', 'Update', 'Import', 'New', 'Remove', 'Get'];
       var result = res.body;

       console.log("result:" + result);

       for (var i = 0; i < result.length; i++) {
         if (result[i] != null && verbs.indexOf(result[i]) === -1) {
           throw new Error("Not all verbs for module found");
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

   it('should have connection refused', function(done) {

     request(url)
     .get('/error')
     .expect(function(res) {
       if(res !== null) {
         throw new Error("Should have refused connection");
       }
     })
     .end(function(err, res) {

     });

     done();

   });

   it('should get command details of Get-Command', function(done) {

     request(url)
     .get('/command-details?command=Get-Command')
     .expect(function(res) {
       var result = res.body;

       if (!result.includes('[["-ArgumentList","Object","-Verb","string","-Noun","string","-Module","string","-FullyQualifiedModule","ModuleSpecification","-TotalCount","int","-Syntax","-ShowCommandInfo","-All","-ListImported","-ParameterName","string","-ParameterType","PSTypeName"],["-Name","string","-ArgumentList","Object","-Module","string","-FullyQualifiedModule","ModuleSpecification","-CommandType","CommandTypes","-TotalCount","int","-Syntax","-ShowCommandInfo","-All"]]')) {
         throw new Error("Invalid command details");
       }
     })
     .end(function(err, res) {

     });

     done();

   });

   it('should output error of G', function(done) {

     request(url)
     .get('/command-details?command=G')
     .expect(function(res) {
       var result = res.body;

       if (!result[2].includes('recognized') && !result[2].includes('not')) {
         throw new Error("Should have command not recognized");
       }
     })
     .end(function(err, res) {

     });

     done();

   });

   it('should run Get-PackageProvider', function(done) {

     request(url)
     .get('/run?command=Get-PackageProvider&params=')
     .expect(function(res) {
       var result = res.body[1];

       if (!result.includes("Name") && !result.includes("Version") && !result.includes("DynamicOptions")) {
         throw new Error("Command not run");
       }
     })
     .end(function(err, res) {

     });

     done();

   });

   it('should run Get-Help', function(done) {

     request(url)
     .get('/run?command=Get-Help&params=')
     .expect(function(res) {
       var result = res.body;

       if (result.length === 0) {
         throw new Error("Command not run");
       }
     })
     .end(function(err, res) {

     });

     done();

   });

   it('should return items for servicefl', function(done) {

     request(url)
     .get('/servicefl')
     .expect(function(res) {
       var result = res.body;

       if (result.length === 0) {
         throw new Exception("Length of servicefl is 0");
       }
     })
     .end(function(err, res) {

     });

     done();

   });

   it('should return items for fl-service', function(done) {

     request(url)
     .get('fl?noun=Service')
     .expect(function(res) {
       var result = res.body;

       if (result.length === 0) {
         throw new Exception("Length of servicefl is 0");
       }
     })
     .end(function(err, res) {

     });

     done();

   });

});
