define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel',
    //'d3.geodesic.min.js'
    'lib/d3-plugins-master/geodesic/geodesic',
    //'https://d3js.org/d3-array.v1.min.js',
    //'https://d3js.org/d3-geo.v1.min.js',
    //'https://d3js.org/d3-geo-projection.v1.min.js'
    //'https://d3js.org/d3-array.v1.min.js',
    //'https://d3js.org/d3-geo.v1.min.js'
    'lib/d3-geo-projection/d3-geo-projection',
    //'http://d3js.org/topojson.v1.min.js'
    //'lib/d3-plugins-master/geom/contour/contour',
    //'lib/d3-plugins-master/geo/polyhedron/polyhedron',
    //'lib/d3-plugins-master/geo/tile/tile'
    'http://d3js.org/d3.geo.projection.v0.min.js'

], function($, $ui, d3, backbone, planetModel) {

  var planetView = backbone.View.extend({

    /***********************************************/
    //
    // initialize starts the program, and the code will not
    // run without it. It does not have to be called.
    //
    /***********************************************/
    initialize: function() {

      this.activate_surface_area_sim();
      this.projection();

    },

    activate_surface_area_sim: function() {
      $("#surface_area").click(function(){

        $("#planet_surface_area").show();
        $("#planet_mass").hide();
        $("#planet_diameter").hide();
        $("#planet_volume").hide();

      });
      //$("#surfaceArea")
    },

    projection: function() {
      var width = 960,
          height = 500;

      var projection = d3.geo.aitoff()
          .scale(150)
          .translate([width / 2, height / 2])
          .precision(.1);

      var projection2 = d3.geo.wiechel()
          .scale(50);

      var path = d3.geo.path()
          .projection(projection);

      var graticule = d3.geo.graticule();

      var svg = d3.select("#planet_surface_area").append("svg")
          .attr("width", width)
          .attr("height", height);

      svg.append("path")
          .datum(graticule)
          .attr("class", "graticule line")
          .attr("d", path);

      svg.append("path")
          .datum(graticule.outline)
          .attr("class", "graticule outline")
          .attr("d", path);

    }

  });

  return planetView;

});
