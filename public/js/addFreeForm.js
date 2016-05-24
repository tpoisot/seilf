$(".freeform").keyup(_.debounce(function() {
  // The string to look for is the content of the search form
  // We lowercase it to make search case-insensitive
  var citation = $(".freeform").val();
  $("#infobox").empty();
  $("#infobox").append("<i class='fa fa-spinner fa-spin fa-fw'></i>");
  $("#infobox").append(" Search in progress");

  $.ajax({
    type: 'GET',
    url: '/crossref/' + citation,
    success: function(data) {
      $("#infobox").empty();
      $("#infobox").append("<h2>Search results</h2>");
      for (var i = 0; i < Math.min(10, data.length); i++) {

        var $p = $("<p/>").addClass("crossrefResult").html(data[
          i].fullCitation);

        var doi = encodeURIComponent(data[i].doi.replace(
          "http://dx.doi.org/", ''));

        var $addlink = $("<a/>", {
          href: "#",
          onClick: "addRefByDOI('" + doi + "')",
          html: "<i class='fa fa-fw fa-plus'></i>",
        }).addClass("crossrefAdd");

        $p.prepend($addlink)

        $("#infobox").append($p);
      }
    }

  });
}, 1000))
