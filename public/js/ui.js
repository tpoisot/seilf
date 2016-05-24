$("#gohome").click(function() {
  $("#infobox").empty();
  $(".titlequery").val('');
  $("li.entry").each(function(i) {
    $(this).show();
  });
  $(".addFreeForm").hide();
  $(".searchByTitle").show();
})

$("#freeform").click(function() {
  $(".addFreeForm").show();
  $(".searchByTitle").hide();
})

$(document).ready(function() {
  $(".addFreeForm").hide();
  $(".searchByTitle").show();
})
