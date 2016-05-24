var express = require('express');
var stylus = require('express-stylus');
var nib = require('nib');

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

seilf.listen(3000, function() {
  console.log('seilf listening on port 3000');
})
