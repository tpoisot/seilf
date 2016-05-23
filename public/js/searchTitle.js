// This function will query titles based on the search bar
$(".titlequery").keyup(_.debounce(function() {
  // The string to look for is the content of the search form
  // We lowercase it to make search case-insensitive
  var toMatch = $(".titlequery").val().toLowerCase();
  // Then, for every entry as a list
  // TODO: This should really be cached when the page loads
  $("li.entry").each(function(i) {
      // The thing to search in is the title
      var toSearch = $(this).find(".title").text().toLowerCase();
      if (toSearch.indexOf(toMatch) == -1) {
        // We hide if there is no match
        $(this).hide();
      } else {
        // We show if there is a match
        $(this).show();
      }
    })
    // Most importantly, we do everything with a 500ms delay thanks to underscore's
    // debounce function. This reduces the number of requests when typing.
}, 500))
