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
      var local_item = {
          "name": response.artists.artist[i].name,
          "listeners": response.artists.artist[i].listeners,
          "playcount": response.artists.artist[i].playcount
        };
      var item = response.artists.artist[i];
      storeLocally(i, local_item);
      //attach(item);
    }
  }

  function storeLocally(i, local_item) {
    localStorage.setItem(i, JSON.stringify(local_item));
  }

  function attach(item) {
    var itemstring = '<div>' + item.listeners + " " + item.playcount + " " + item.name + '</div>';
    $("#list").append(itemstring);
  }

  var listenersArray = [];
  for (var i = 0; i < localStorage.responseLength; i++) {
    var stored_item = localStorage.getItem(i);
    var parsed_item = JSON.parse(stored_item);
    listenersArray.push([parsed_item.name, parsed_item.listeners, parsed_item.playcount]);
  }
  localStorage.setItem("listenersArray", JSON.stringify(listenersArray));
  //console.log(JSON.parse(localStorage.getItem("listenersArray")));

});
