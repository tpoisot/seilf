// This function will query titles based on the search bar
$(".titlequery").keyup(_.debounce(function() {
  $.ajax({
      type: 'GET',
      url: '/search/' + encodeURIComponent($(".titlequery").val()),
      success: function(data) {
        console.log(data);
        $("li.entry").each(function(i) {
          $(this).hide();
        });
        for (var i = 0; i < data.length; i++) {
          $("#" + data[i]).show();
        }
      }
    })
    // Most importantly, we do everything with a 500ms delay thanks to underscore's
    // debounce function. This reduces the number of requests when typing.
}, 500))
