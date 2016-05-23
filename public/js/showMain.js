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

      if (data.id) {
        var $id = $("<span/>").addClass("id").html(data.id);
        $('#infobox').append($id);
      }
    }
  })
}
