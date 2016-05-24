function icon(name) {
  $icon = $("<i/>").addClass("fa").addClass("fa-fw").addClass("fa-" + name).attr(
    'aria-hidden', 'true');
  return $icon;
}

function showMain(id) {
  $.ajax({
    type: 'GET',
    url: '/item/' + id,
    success: function(data) {
      $('#infobox').empty();

      if (data.title) {
        var $title = $("<span/>").addClass("title").html(data.title);
        $('#infobox').append($title);
      }

      if (data['container-title']) {
        var $in = $("<span/>").addClass("in").html(data['container-title']);
        $('#infobox').append($in);
      }

      if (data.author) {
        var $aut = $("<div/>").addClass("authors");
        for (var i = 0; i < data.author.length; i++) {
          var aType, aName;
          if (data.author[i].literal) {
            aType = "institution";
            aName = data.author[i].literal;
          } else {
            aType = "user";
            aName = data.author[i].family + ", " + data.author[i].given;
          }
          var $thisAuthor = $('<span/>').addClass("author").html(aName);
          $thisAuthor.prepend(icon(aType));
          $aut.append($thisAuthor);
        }
        $('#infobox').append($aut);
      }

      if (data.id) {
        var $id = $("<span/>").addClass("id").html(data.id);
        $id.prepend(icon('key'));
        $('#infobox').append($id);
      }

      if (data.DOI) {
        var $link = $('<a/>', {
          text: data.DOI,
          href: "http://dx.doi.org/" + data.DOI,
          title: "DOI link for " + data.title
        });
        var $doi = $("<span/>").addClass("doi").append($link);
        $doi.prepend(icon('external-link'));
        $('#infobox').append($doi);
      }

    }
  })
}
