var delay = (function () {
  var timer = 0;
  return function (callback, ms) {
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
  var names;
  var printedAuthorName;
  if (e.editor) names = 'editor';
  if (e.author) names = 'author';
  if (names) {
    printedAuthorName = formatAuthorName(e[names][0]);
    if (e[names].length > 2) {
      printedAuthorName += ' et al.';
    }
    if (e[names].length == 2) {
      printedAuthorName += ' & ' + formatAuthorName(e[names][1]);
    }
  }
  return printedAuthorName;
}
