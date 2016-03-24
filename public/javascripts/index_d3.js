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
