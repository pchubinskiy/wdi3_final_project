$(window).load(function() {
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

var data = JSON.parse(localStorage.getItem("listenersArray"));

d3.select("#graph")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    // to get pixels at ideal size, subtract 1/7 of the listeners
    // amount from itself to match the domain:range ratio (7000000:600)
    .style("width", function(d) { return ((d[1]/10000) - ((d[1]/10000)/7)) + "px" })
    .html(function(d) { return d[0] })
    .attr('class', 'bar')
    .attr('id', function(d) { return d[0] })
    .attr('href', function(d) { return d[3] });

var x = d3.scale.linear()
                .domain([0, 7000000])
                .range([0, 600]);

var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(10);

var svg = d3.select("#graph").append("svg")
    .attr("width", 900)
    .attr("height", 40)

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(10, 0)")
    .call(xAxis)
  .append("text")
    .attr("x", 600)
    .attr("dy", "2.71em")
    .style("text-anchor", "end")
    .text("Listeners");
