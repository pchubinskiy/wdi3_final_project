$(function() {
  $('#information').removeClass('hidden');
  $('#artist_moused_over').html("Daft Punk");
  $('#artist_image').attr('src', "http://img2-ak.lst.fm/i/u/174s/9fd718d4c80e4ac89107c6c0bb908440.png");
  $('#genre_tags').html("Genre Tags:");
  showGenre("electronic", 0); showGenre("dance", 1); showGenre("House", 2); showGenre("electronica", 3); showGenre("techno", 4);

  var apiMethod = '?method=chart.getTopArtists';
  var apiKey = '&api_key=b1edaebaa4cf27aec0976a586ff47224';
  var format = "&format=json";
  var apiPath = 'http://ws.audioscrobbler.com/2.0/' + apiMethod + apiKey + format;

  $.ajax({
    url: apiPath,
    type: 'GET',
    dataType: 'jsonp',
    data: {},
  })
  .done(function(response) {
    console.log("success");
    console.log(response);
    passForAttaching(response);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

  function passForAttaching(response) {
    //setting response length so it can be accessed when looping through data for chart
    localStorage.setItem('responseLength', response.artists.artist.length);

    for (var i = 0; i < response.artists.artist.length; i++) {
      var local_item = {
          "name": response.artists.artist[i].name,
          "listeners": response.artists.artist[i].listeners,
          "playcount": response.artists.artist[i].playcount,
          "image": response.artists.artist[i].image[2]['#text']
        };
      var item = response.artists.artist[i];
      storeLocally(i, local_item);
    }
  }

  function storeLocally(i, local_item) {
    localStorage.setItem(i, JSON.stringify(local_item));
  }

  var listenersArray = [];
  for (var i = 0; i < localStorage.responseLength; i++) {
    var stored_item = localStorage.getItem(i);
    var parsed_item = JSON.parse(stored_item);
    listenersArray.push([parsed_item.name, parsed_item.listeners, parsed_item.playcount, parsed_item.image]);
  }
  localStorage.setItem("listenersArray", JSON.stringify(listenersArray));
  //console.log(JSON.parse(localStorage.getItem("listenersArray")));

  $(".bar").click(function(event) {
    var item_id = $(this).attr('id');
    var link_for_image = $(this).attr('href');

    var apiMethod = '?method=artist.getTopTags';
    var param1 = '&artist=' + item_id;
    var limit = '&limit=5'
    var apiPath = 'http://ws.audioscrobbler.com/2.0/' + apiMethod + param1 + limit + apiKey + format;

    $.ajax({
      url: apiPath,
      type: 'GET',
      dataType: 'jsonp',
      data: {},
    }) //can I specify which object keys and array indexes are requested? (before return)
    .done(function(response) {
      console.log("success");
      console.log(response);
      passForInfoShow(response, item_id, link_for_image);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

    function passForInfoShow(response, item_id, link_for_image) {
      $('#information').removeClass('hidden');
      $('#artist_moused_over').html(item_id);
      $('#artist_image').attr('src', link_for_image);
      $('#genre_tags').html("Genre Tags:");

      for (var i = 0; i < 5; i++) {
        showGenre(response.toptags.tag[i].name, i);
      }
    }

    function showGenre(item, i) {
      $('#genre_' + i).html(item);
    }
  });

  $('.jumbotron').click(function(event) {
    passForInfoShow("", "", "");
  });

  function passForInfoShow(response, item_id, link_for_image) {
    $("#information").addClass('hidden');
    $('#artist_moused_over').html(item_id);
    $('#artist_image').attr('src', link_for_image);
    $('#genre_tags').html("");

    for (var i = 0; i < 5; i++) {
      showGenre("", i);
    }
  }

  function showGenre(item, i) {
    $('#genre_' + i).html(item);
  }

});
