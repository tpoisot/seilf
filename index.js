var express = require('express');
var stylus = require('express-stylus');
var nib = require('nib');
var request = require('request');

var hylla = require('hylla');

var seilf = express();
seilf.set('view engine', 'pug');
seilf.locals.pretty = true;

var publicDir = require('path').join(__dirname, '/public');

seilf.use(stylus({
  src: publicDir,
  use: [nib()],
  import: ['nib']
}));

seilf.use(express.static(publicDir));

var path = require('path').dirname(require.main.filename);
var lib = new hylla.Library(path);

seilf.get('/', function(req, res) {
  var entries = lib.entries.map(function(x) {
    return x.content;
  })
  res.render('main', {
    lib: entries
  })
});

// Get infos for a single item
seilf.get('/item/:id', function(req, res) {
  var data = lib.entry(req.params.id);
  if (data) {
    console.log(data.id());
    res.json(data.content);
  }
})

// Get all records
seilf.get('/default.json', function(req, res) {
  var data = lib.entries.map(function(x) {
    return x.content;
  })
  if (data) {
    res.json(data);
  }
})

// Crossref full text search
seilf.get('/crossref/:query', function(req, res) {
  console.log(req.params.query);
  var crossrefUrl = "http://search.labs.crossref.org/dois?q="
  var crossrefResult = request(crossrefUrl + encodeURIComponent(req.params.query),
    function(error, response, body) {
      console.log(response.statusCode);
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      }
    })
})

seilf.get('/doi/:doi', function(req, res) {

});

seilf.listen(3000, function() {
  console.log('seilf listening on port 3000');
})
