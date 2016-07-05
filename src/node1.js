var shell = require('node-powershell').Shell;
var ps = new shell('$a = get-process -name powershell;$a')
ps.execute().then(function(output) { console.log(output) }).catch(function(err){console.log(err);})