var express = require('express');
var stylus = require('express-stylus');
var nib = require('nib');
var request = require('request');

var hylla = require('hylla');

var seilf = express();
seilf.set('view engine', 'pug');
seilf.locals.pretty = true;

var publicDir = require('path')
  .join(__dirname, '/public');

seilf.use(stylus({
  src: publicDir,
  use: [nib()],
  import: ['nib']
}));

seilf.use(express.static(publicDir));

var path = require('path')
  .dirname(require.main.filename);
var lib = new hylla.Library(path);

seilf.get('/', function (req, res) {
  var entries = lib.entries.map(function (x) {
    return x.content;
  })
  res.render('main', {
    lib: entries
  })
});

// Get infos for a single item
seilf.get('/item/:id', function (req, res) {
  var data = lib.entry(req.params.id);
  if (data) {
    console.log(data.id());
    res.json(data.content);
  }
})

// Get all records
seilf.get('/default.json', function (req, res) {
  var data = lib.entries.map(function (x) {
    return x.content;
  })
  if (data) {
    res.json(data);
  }
})

// Crossref full text search
seilf.get('/crossref/:query', function (req, res) {
  console.log(req.params.query);
  var crossrefUrl = "http://search.labs.crossref.org/dois?q="
  var crossrefResult = request(crossrefUrl + encodeURIComponent(req.params.query),
    function (error, response, body) {
      console.log(response.statusCode);
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      }
    })
})

// Search by title
seilf.get('/search/:query', function (req, res) {
  res.json(lib.searchByTitle(req.params.query));
})


seilf.get('/doi/:doi', function (req, res) {
  var doi = req.params.doi;
  if (doi) {
    // Check doi unicity
    var doi_match = lib.entries.filter(function (e, i, a) {
      if (e.doi())  {
        return e.doi()
          .trim()
          .toLowerCase() == doi.trim()
          .toLowerCase();
      } else {
        return false;
      }
    });
    // Is there a match?
    if (doi_match.length > 0) {
      // Note that this is transparent for the user -- it give the same
      // output if it's a new, or existing, reference.
      res.json(doi_match[0].content);
    } else {
      // If new, return the ID after adding it.
      var infos = hylla.doi.refFromDoi(doi);
      var ref = lib.new(infos);
      res.json(lib.entry(ref)
        .content);
    }
  }
});

seilf.listen(3000, function () {
  console.log('seilf listening on port 3000');
})
