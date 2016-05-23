$(".titlequery").keyup(function() {
  var toMatch = $(".titlequery").val().toLowerCase();
  $("li#entry").each(function(i) {
    var toSearch = $(this).find(".title").text().toLowerCase();
    if (toSearch.indexOf(toMatch) == -1) {
      $(this).hide();
    } else {
      $(this).show();
    }
  })
})
