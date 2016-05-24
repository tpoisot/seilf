$("#gohome").click(function() {
  $("#infobox").empty();
  $(".titlequery").val('');
  $("li.entry").each(function(i) {
    $(this).show();
  })
})
