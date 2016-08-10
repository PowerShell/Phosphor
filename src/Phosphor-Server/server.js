var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

var shell = require('node-powershell');

var bodyParser = require('body-parser');

var app = express();

app.use("/", express.static(__dirname + '/../Phosphor-App'));

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + "/../Phosphor-App");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var PS = new shell("./test.ps1");

console.log(__dirname);

var verbs = [];
var nouns = [];
var modules = [];

PS.on('output', function(data){
    //console.log(data);

    if (data.indexOf("-") !== -1) {
      var splitted = data.split("-");

      var firstSplit = (splitted[0] + "").split(/[\s,]+/).join().split(",");

      if (firstSplit[0] === "Cmdlet" || firstSplit[0] ==="Function") {
        var verb = firstSplit[firstSplit.length - 1];

        var secondSplit = (splitted[1] + "").split(/[\s,]+/).join().split(",");
        var noun =  secondSplit[0];
        var module = secondSplit[secondSplit.length - 2];

  /*
        console.log("Verb: " + verb);
        console.log("Noun: " + noun);
        console.log("Module: " + module);
  */

        if (!nouns[noun]) {
          nouns[noun] = noun;
          nouns.push(noun + "-" + module);
        }


        if (!modules["" + module]) {
          modules["" + module] = [];
          modules["" + module].push(noun);
        }
        else {
            modules["" + module].push(noun);
        }

        var unique = true;

        for (var i = 0; i < modules.length; i++) {
          if (modules[i] === module) {
            unique = false;
          }
        }

        if (unique) {
          modules.push(module);
        }

        if (!verbs["" + noun]) {
          verbs["" + noun] = [];
        }

        //Don't want to include Get as a verb
        if (verb !== "Get") {
            verbs["" + noun].push(verb);
        }

        //console.log("Noun: " + noun + " | Verb: " + verbs[noun]);
      }
    }

    //console.log(data);

/*
    console.log(modules[module]);
    console.log("List of modules: " + modules);
    console.log("BREAK");
    */

});
PS.on('end', function(code) {
    //optional callback
    //Do Something
});

//app.use('/app', express.static(path.resolve(__dirname, 'app')));
//app.use('/libs', express.static(path.resolve(__dirname, 'libs')));

var renderIndex = (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'index.html'));
    res.render('index.ejs', {nouns: nouns, modules: modules});
}

app.get('/', renderIndex);

app.get('/test', (req, res) => {
  res.json({greeting: "hello"});
});

app.get('/fl', (req, res) => {
  var query = req.query;
  var noun = query.noun;

  var result = [];

  var ptr = -1;

  var curr = "";

  PS = new shell("Get-" + noun + " | fl");

  PS.on('output', function(data) {
    if (data.length > 3) {
      if (data.substring(0,4) === "Name") {
        ptr++;

        if (ptr != 0) {
          result.push(curr);
          curr = "";
        }
      }
      curr+= data + ";";
    }
  });

  setTimeout(function() {
    res.send(result);
  }, 3000);

});

app.get('/servicefl', (req, res) => {

  var result = [];

  var ptr = -1;

  var curr = "";

  PS = new shell("Get-Service | fl");

  PS.on('output', function(data) {
    if (data.length > 3) {
      if (data.substring(0,4) === "Name") {
        ptr++;

        if (ptr != 0) {
          result.push(curr);
          curr = "";
        }
      }
      curr+= data + ";";
    }
  });

  setTimeout(function() {
    res.send(result);
  }, 3000);
});

app.get('/nounitems', (req, res) => {

  var query = req.query;
  var noun = query.noun;

  console.log("Request for Noun Items for noun: " + noun);

  var result = [];

  function psgo() {
    PS = new shell("Get-" + noun + "| Format-Table");

    PS.on('output', function(data){
      if (!data.includes("--") && !data.includes("AH0")) {
        console.log(data);
        result.push(data);
      }
    });
  }

  psgo();

  setTimeout((function() {
      result.pop();
      res.send(result);
    }
  ), 3500);

});

app.get('/verbs', (req, res) => {
  var query = req.query;
  var noun = query.noun;

  console.log("Request for verbs for noun: " + noun);

  //res.send(verbs["" + noun]);

  setTimeout((function() {
      res.send(verbs["" + noun.trim()]);
    }
  ), 400);
});

app.get('/command-details', (req, res) => {
  var query = req.query;
  var command = query.command;

  var result = [];

  console.log("Request for command details: " + command);

  PS = new shell("Get-Command " + command + " -Syntax");

  PS.on('output', function(data) {
    console.log(data);

    var split = data.split(command);

    console.log("Split: " + split);

    for (var splitIdx = 1; splitIdx < split.length; splitIdx++) {
      console.log("Split idx: " + splitIdx + ": " + split[splitIdx]);

      var currSyntax = split[splitIdx];

      var tokens = currSyntax.split(" ");

      var arr = [];

      //Starting at 1 gets rid of the "" and ending before the last one is just common parameters
      for (var tokenIdx = 1; tokenIdx < tokens.length - 1; tokenIdx++) {
        var cleansed = "";

        var current = tokens[tokenIdx];

        for (var j = 0; j < current.length; j++) {
          if (valid[current.charAt(j)]) {
            cleansed += current.charAt(j);
          }
        }

        console.log(cleansed);
        arr.push(cleansed)
      }

      result.push(arr);

    }

  });

  setTimeout((function() {
      console.log("result: " + result);
      res.send(result);
    }
  ), 3000);

});


app.get('/command-parameters', (req, res) => {
  var query = req.query;
  var command = req.command;
  //Grab Parameters: (Get-Command New-Name).Parameters
  //Grab valid values for a particular parameter: (Get-Command New-Name).Parameters["Type"].Attributes[0].ValidValues

  /* PS = new shell("(Get-Command New-Name).Parameters["Type"].Attributes[0].ValidValues"); */

  res.send("not implemented");

});

app.get('/run', (req, res) => {
  var query = req.query;
  var command = query.command;
  var params = query.params;

  var result = [];

  PS = new shell(command + " " + params);

  PS.on('output', function(data) {
    result.push(data);
  });

  setTimeout((function() {
      res.send(result);
    }
  ), 4000);

});


var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});

var valid = [];

valid['a'] = 1;
valid['b'] = 1;
valid['c'] = 1;
valid['d'] = 1;
valid['e'] = 1;
valid['f'] = 1;
valid['g'] = 1;
valid['h'] = 1;
valid['i'] = 1;
valid['j'] = 1;
valid['k'] = 1;
valid['l'] = 1;
valid['m'] = 1;
valid['n'] = 1;
valid['o'] = 1;
valid['p'] = 1;
valid['q'] = 1;
valid['r'] = 1;
valid['s'] = 1;
valid['t'] = 1;
valid['u'] = 1;
valid['v'] = 1;
valid['w'] = 1;
valid['x'] = 1;
valid['y'] = 1;
valid['z'] = 1;

valid['A'] = 1;
valid['B'] = 1;
valid['C'] = 1;
valid['D'] = 1;
valid['E'] = 1;
valid['F'] = 1;
valid['G'] = 1;
valid['H'] = 1;
valid['I'] = 1;
valid['J'] = 1;
valid['K'] = 1;
valid['L'] = 1;
valid['M'] = 1;
valid['N'] = 1;
valid['O'] = 1;
valid['P'] = 1;
valid['Q'] = 1;
valid['R'] = 1;
valid['S'] = 1;
valid['T'] = 1;
valid['U'] = 1;
valid['V'] = 1;
valid['W'] = 1;
valid['X'] = 1;
valid['Y'] = 1;
valid['Z'] = 1;

valid['-'] = 1;
/*
valid['['] = 1;
valid[']'] = 1;
*/
