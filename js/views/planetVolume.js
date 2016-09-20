define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel'

], function($, $ui, d3, backbone, planetModel) {

  var planetView = backbone.View.extend({

    /***********************************************/
    //
    // initialize starts the program, and the code will not
    // run without it. It does not have to be called.
    //
    /***********************************************/
    initialize: function() {
      this.activate_volume_sim();
      this.circle();
    },

    activate_volume_sim: function() {
      $("#volume").click(function(){
        $("#planet_volume").show();
        $("#planet_surface_area").hide();
        $("#planet_mass").hide();
        $("#planet_diameter").hide();

      });
    },

    circle: function() {

      var width = 960,
          height = 700;

      var velocity = [-.003, .003];

      var projection = d3.geo.orthographic()
          .scale(200);

      var path = d3.geo.path()
          .projection(projection);

      //var pdata = this.model.get("data").shift();
      var svg = d3.select("#planet_volume").selectAll("svg").data(this.model.get("data")).enter()
      .append("svg")
          .style("position","absolute")
          .style("transform",function(d){
            return "scale("+d.diameter/100000+")"
          })
          .style("margin-top","150px")
          .attr("width", width)
          .attr("height", height);

      var feature = svg.append("path")
          .datum(d3.geodesic.multilinestring(6));

      d3.timer(function(elapsed) {
        projection.rotate([elapsed * velocity[0], elapsed * velocity[1]]);
        feature.attr("d", path);
      });
    },

  });

  return planetView;

});
