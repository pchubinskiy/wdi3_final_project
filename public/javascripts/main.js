$(function() {
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
      var localItem = {
          "name": response.artists.artist[i].name,
          "listeners": response.artists.artist[i].listeners,
          "playcount": response.artists.artist[i].playcount,
          "image": response.artists.artist[i].image[2]['#text']
        };
      storeLocally(i, localItem);
    }
  }

  function storeLocally(i, localItem) {
    localStorage.setItem(i, JSON.stringify(localItem));
  }

  //stores the set of responses in listenersArray, which will be passed to the D3 script "index_d3.js"
  //in order to create bars for the graph
  var listenersArray = [];
  for (var i = 0; i < localStorage.responseLength; i++) {
    var storedItem = localStorage.getItem(i);
    var parsedItem = JSON.parse(storedItem);
    listenersArray.push([parsedItem.name, parsedItem.listeners, parsedItem.playcount, parsedItem.image]);
  }
  localStorage.setItem("listenersArray", JSON.stringify(listenersArray));

  $(".bar").click(function(event) {
    var itemId = $(this).attr('id');
    var linkForImage = $(this).attr('href');

    var apiMethod = '?method=artist.getTopTags';
    var param1 = '&artist=' + itemId;
    var limit = '&limit=5'
    var apiPath = 'http://ws.audioscrobbler.com/2.0/' + apiMethod + param1 + limit + apiKey + format;

    $.ajax({
      url: apiPath,
      type: 'GET',
      dataType: 'jsonp',
      data: {},
    })
    .done(function(response) {
      console.log("success");
      console.log(response);
      passForInfoDisplay(response, itemId, linkForImage);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

    function passForInfoDisplay(response, itemId, linkForImage) {
      $('#information').removeClass('hidden');
      $('#artist_moused_over').html(itemId);
      $('#artist_image').attr('src', linkForImage);
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
    passForInfoDisplay("", "", "");
  });

  function passForInfoDisplay(response, itemId, linkForImage) {
    $("#information").addClass('hidden');
    $('#artist_moused_over').html(itemId);
    $('#artist_image').attr('src', linkForImage);
    $('#genre_tags').html("");

    for (var i = 0; i < 5; i++) {
      showGenre("", i);
    }
  }

  function showGenre(item, i) {
    $('#genre_' + i).html(item);
  }

});
