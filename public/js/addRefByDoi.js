function addRefByDoi(doi) {
  $.ajax({
    type: 'GET',
    url: '/doi/' + doi,
    success: function(data) {
      console.log(data);
      showMain(data.id);
    }
  })
}
