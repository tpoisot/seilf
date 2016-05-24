var delay = (function() {
  var timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

function formatAuthorName(n) {
  var printedAs;
  if (n.family) {
    printedAs = n.family;
  } else {
    printedAs = n.literal;
  }
  return printedAs;
}

function formatAuthors(e) {
  var printedAuthorName = formatAuthorName(e.author[0]);
  if (e.author.length > 2) {
    printedAuthorName += ' et al.';
  }
  if (e.author.length == 2) {
    printedAuthorName += ' & ' + formatAuthorName(e.author[1]);
  }
  return printedAuthorName;
}
