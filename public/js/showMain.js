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

        var printedAuthorName = formatAuthorName(data.author[0]);
        if (data.author.length > 2) {
          printedAuthorName += ' et al.';
        }
        if (data.author.length == 2) {
          printedAuthorName += ' & ' + formatAuthorName(data.author[1]);
        }
        var $aut = $("<span/>").addClass("author").html(printedAuthorName);
        $('#infobox').append($aut);
      }

      if (data.id) {
        var $id = $("<span/>").addClass("id").html(data.id);
        $('#infobox').append($id);
      }
    }
  })
}
