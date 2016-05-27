$("#gohome")
  .click(function () {
    $("#infobox")
      .empty();
    $("li.entry")
      .each(function (i) {
        $(this)
          .show();
      });
    $(".titlequery")
      .val('');
    $(".freeform")
      .val('');
    $(".addFreeForm")
      .hide();
    $(".searchByTitle")
      .show();
  })

$("#freeform")
  .click(function () {
    $(".titlequery")
      .val('');
    $(".freeform")
      .val('');
    $(".addFreeForm")
      .show();
    $(".searchByTitle")
      .hide();
  })

function formatReferenceInMainList(data) {
  var $ref = $("<li/>")
    .addClass("entry")
    .attr("onClick", "showMain('" + data.id + "')")
    .attr("id", data.id);
  // Icon type
  var itype = "file-text";
  if (data.type == "monograph") itype = "book";
  var $type = icon(itype)
    .addClass("inlist");
  $ref.append($type);
  // Title
  var $title = $("<span/>")
    .addClass("title")
    .html(data.title);
  $ref.append($title);
  // Author
  var $author = $("<span/>")
    .addClass("author")
    .html(formatAuthors(data));
  $ref.append($author);
  $ref.append($("<span/>")
    .addClass("spacer")
    .html(" in "));
  // Container
  var $in = $("<span/>")
    .addClass("in")
    .html(data['container-title']);
  $ref.append($in);
  // ID
  var $id = $("<span/>")
    .addClass("id")
    .html(data.id);
  $ref.append($id);
  // Return
  return $ref;
}

function reloadEntries() {
  $.ajax({
    type: 'GET',
    url: '/default.json',
    success: function (data) {
      console.log(data);
      $("#entries")
        .empty();
      for (var i = 0; i < data.length; i++) {
        $("#entries")
          .append(formatReferenceInMainList(data[i]));
      }
    }
  });
};

$(document)
  .ready(function () {
    $(".titlequery")
      .val('');
    $(".freeform")
      .val('');
    $(".addFreeForm")
      .hide();
    $(".searchByTitle")
      .show();
    reloadEntries();
  })
