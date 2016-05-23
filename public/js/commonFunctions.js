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
