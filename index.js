var express = require('express');
var stylus = require('express-stylus');
var nib = require('nib');

var hylla = require('hylla');

var seilf = express();
seilf.set('view engine', 'pug');

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
  res.render('main', {
    lib: lib
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

seilf.listen(3000, function() {
  console.log('seilf listening on port 3000');
})
