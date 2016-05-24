$("#gohome").click(function() {
  $("#infobox").empty();
  $(".titlequery").val('');
  $(".freeform").val('');
  $("li.entry").each(function(i) {
    $(this).show();
  });
  $(".addFreeForm").hide();
  $(".searchByTitle").show();
})

$("#freeform").click(function() {
  $(".titlequery").val('');
  $(".freeform").val('');
  $(".addFreeForm").show();
  $(".searchByTitle").hide();
})

$(document).ready(function() {
  $(".titlequery").val('');
  $(".freeform").val('');
  $(".addFreeForm").hide();
  $(".searchByTitle").show();
})
