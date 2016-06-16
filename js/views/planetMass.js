
define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel'
    //'earth'
], function($, $ui, d3, backbone, planetModel) {

  var planetView = backbone.View.extend({

    initialize: function() {

      //this.elementMass = "#planet_mass";

      //this.width = this.model.get("width");
      //this.height = this.model.get("height");

      //this.draw_planets();
      //this.draw_chart();
      //this.planet_sliding();
      this.draw_svg_planets();
      this.weight_scale();

    },

    planet_sliding: function() {
      //$("#myCarousel").carousel({interval: false});
    },

    draw_planets: function() {

        var prev = 2;
        var next = 3;

        this.planets = d3.select(this.elementMass).append("img")
                    .attr("src","Earth"+".svg")
                    .attr("alt","Earth")
                    .attr("width",100)
                    .attr("height",100);

        $("#mass").click(function(){

            //prev++;
            //next++;

            d3.select("#mass").transition().style("color","red");

          });


        console.log("Prev:"+prev+" Next:"+next);

        /*for (var planetNumber = 2; planetNumber < 3; planetNumber++) {
          //console.log(this.model.get("name")[i]+".svg");
          planetName = this.model.get("name")[planetNumber];

          this.planets = d3.select(this.elementMass).append("img")
                      .attr("src",planetName+".svg")
                      .attr("alt",planetName)
                      .attr("width",100)
                      .attr("height",100);
        }*/


    },

    draw_svg_planets: function() {

      //this.svg = d3.select(this).append("g")

    },

    weight_scale: function() {
      this.margin = {top: 20, right: 30, bottom: 30, left: 40},
            //console.log(document.
            width = 960 - this.margin.left - this.margin.right,
            height = 500 - this.margin.top - this.margin.bottom;

      this.chart = d3.select(".chart")
            .attr("width", width + this.margin.left + this.margin.right)
            .attr("height", height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      this.x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

      this.y = d3.scale.linear()
            .range([height, 0]);

      this.x.domain(this.model.get("mass").map(function(d) { return d.name; }));
      this.y.domain([0, d3.max(this.model.get("mass"), function(d) { return d.value; })]);

      var barWidth = this.width / this.model.get("mass").length;

      var scope = this;

      this.xAxis = d3.svg.axis()
          .scale(this.x)
          .orient("bottom");

      this.yAxis = d3.svg.axis()
          .scale(this.y)
          .orient("left")
          .ticks(10, "%");

      this.chart.selectAll(".bar")
          .data(scope.model.get("mass"))
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return scope.x(d.name); })
          .attr("y", function(d) { return scope.y(d.value); })
          .attr("height", function(d) { return height - scope.y(d.value); })
          .attr("width", scope.x.rangeBand())

      this.chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(this.xAxis);

      this.chart.append("g")
          .attr("class", "y axis")
          .call(this.yAxis);

    },

    draw_chart: function() {
      this.svg = d3.select(this.elementMass).append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
    }


  });

  return planetView;


});
