define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel',
    //'d3.geodesic.min.js'
    'lib/d3-plugins-master/geodesic/geodesic',
    'lib/d3-plugins-master/geo/polyhedron/polyhedron'
    //'lib/d3-plugins-master/geom/contour/contour',
    //'lib/d3-plugins-master/geo/polyhedron/polyhedron',
    //'lib/d3-plugins-master/geo/tile/tile'

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
      this.circle();
      //this.draw_geodisk();

    },

    activate_surface_area_sim: function() {
      $("#surface_area").click(function(){

        $("#planet_surface_area").show();
        $("#planet_mass").hide();
        $("#planet_diameter").hide();

      });
      //$("#surfaceArea")
    },

    circle: function() {
      //d3.geoArmadillo();

      var width = 960,
          height = 500;

      var velocity = [-.003, .003];

      var projection = d3.geo.orthographic()//.data(this.model.get("data"))
          .scale(100);

      //var projection2 = d3.geo.orthographic().scale(200);

      var path = d3.geo.path()
          .projection(projection);

      var svg = d3.select("#planet_surface_area")//.selectAll().data(this.model.get("data")).enter()
      .append("svg")
          .attr("width", width)//function(d){return d.diameter/3000;})
          .attr("height", height);//function(d){return d.diameter/3000;});

      console.log(d3.geodesic.multilinestring(6))

      var feature = svg//.data(this.model.get("data")).enter()
        .append("path")//.attr("transform",function(d){
          //console.log(d);
          //return "translate("+(-d.diameter/3000)/2+", "+(-d.diameter/3000)/2+")";
        //})//.style("stroke","green")
          .datum(d3.geodesic.multilinestring(6));

      /*svg.append("circle")
          .attr("r", 100)
          .attr("cx", width / 2)
          .attr("cy", height / 2);*/

      /*d3.select("path").on("mouseover", function(){
        d3.select(this).style("stroke","red");
      })*/

      d3.timer(function(elapsed) {
        projection.rotate([elapsed * velocity[0], elapsed * velocity[1]]);
        //console.log(path);
        feature.attr("d", path);
      });
    },

    draw_geodisk: function() {
      /*var width = 960,
          height = 500;

      var velocity = [.010, .005],
          t0 = Date.now();

      var projection = d3.geo.orthographic()
          .scale(height / 2 - 10);

      var canvas = d3.select("#geodesic_holder").append("canvas")
          .attr("width", width)
          .attr("height", height);

      var context = canvas.node().getContext("2d");

      context.strokeStyle = "#000";
      context.lineWidth = .5;

      var faces;

      var output = d3.select("output");

      var input = d3.select("input")
          .on("input", function() { geodesic(+this.value); })
          .on("change", function() { geodesic(+this.value); })
          .each(function() { geodesic(+this.value); });

      d3.timer(function() {
        var time = Date.now() - t0;
        projection.rotate([time * velocity[0], time * velocity[1]]);
        redraw();
      });

      function redraw() {
        context.clearRect(0, 0, width, height);

        faces.forEach(function(d) {
          d.polygon[0] = projection(d[0]);
          d.polygon[1] = projection(d[1]);
          d.polygon[2] = projection(d[2]);
          if (d.visible = d.polygon.area() > 0) {
            context.fillStyle = d.fill;
            context.beginPath();
            drawTriangle(d.polygon);
            context.fill();
          }
        });

        context.beginPath();
        faces.forEach(function(d) {
          if (d.visible) {
            drawTriangle(d.polygon);
          }
        });
        context.stroke();
      }

      function drawTriangle(triangle) {
        context.moveTo(triangle[0][0], triangle[0][1]);
        context.lineTo(triangle[1][0], triangle[1][1]);
        context.lineTo(triangle[2][0], triangle[2][1]);
        context.closePath();
      }

      function geodesic(subdivision) {
        output.text(subdivision);

        faces = d3.geodesic.polygons(subdivision).map(function(d) {
          d = d.coordinates[0];
          d.pop(); // use an open polygon
          d.fill = d3.hsl(d[0][0], 1, .5) + "";
          d.polygon = d3.geom.polygon(d.map(projection));
          return d;
        });

        redraw();
      }*/

    }

  });

  return planetView;

});
