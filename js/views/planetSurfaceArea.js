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
    'lib/d3-geo-projection/d3-geo-projection'
    //'http://d3js.org/topojson.v1.min.js'
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
      //this.map();
      //this.draw_geodisk();

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

    map: function() {

      var width = 960,
        height = 500;

      var options = [
        {name: "Aitoff", projection: d3.geo.aitoff()},
        {name: "Albers", projection: d3.geo.albers().scale(145).parallels([20, 50])},
        {name: "August", projection: d3.geo.august().scale(60)},
        {name: "Baker", projection: d3.geo.baker().scale(100)},
        {name: "Boggs", projection: d3.geo.boggs()},
        {name: "Bonne", projection: d3.geo.bonne().scale(120)},
        {name: "Bromley", projection: d3.geo.bromley()},
        {name: "Collignon", projection: d3.geo.collignon().scale(93)},
        {name: "Craster Parabolic", projection: d3.geo.craster()},
        {name: "Eckert I", projection: d3.geo.eckert1().scale(165)},
        {name: "Eckert II", projection: d3.geo.eckert2().scale(165)},
        {name: "Eckert III", projection: d3.geo.eckert3().scale(180)},
        {name: "Eckert IV", projection: d3.geo.eckert4().scale(180)},
        {name: "Eckert V", projection: d3.geo.eckert5().scale(170)},
        {name: "Eckert VI", projection: d3.geo.eckert6().scale(170)},
        {name: "Eisenlohr", projection: d3.geo.eisenlohr().scale(60)},
        {name: "Equirectangular (Plate Carrée)", projection: d3.geo.equirectangular()},
        {name: "Hammer", projection: d3.geo.hammer().scale(165)},
        {name: "Hill", projection: d3.geo.hill()},
        {name: "Goode Homolosine", projection: d3.geo.homolosine()},
        {name: "Kavrayskiy VII", projection: d3.geo.kavrayskiy7()},
        {name: "Lambert cylindrical equal-area", projection: d3.geo.cylindricalEqualArea()},
        {name: "Lagrange", projection: d3.geo.lagrange().scale(120)},
        {name: "Larrivée", projection: d3.geo.larrivee().scale(95)},
        {name: "Laskowski", projection: d3.geo.laskowski().scale(120)},
        {name: "Loximuthal", projection: d3.geo.loximuthal()},
        // {name: "Mercator", projection: d3.geo.mercator().scale(490 / 2 / Math.PI)},
        {name: "Miller", projection: d3.geo.miller().scale(100)},
        {name: "McBryde–Thomas Flat-Polar Parabolic", projection: d3.geo.mtFlatPolarParabolic()},
        {name: "McBryde–Thomas Flat-Polar Quartic", projection: d3.geo.mtFlatPolarQuartic()},
        {name: "McBryde–Thomas Flat-Polar Sinusoidal", projection: d3.geo.mtFlatPolarSinusoidal()},
        {name: "Mollweide", projection: d3.geo.mollweide().scale(165)},
        {name: "Natural Earth", projection: d3.geo.naturalEarth()},
        {name: "Nell–Hammer", projection: d3.geo.nellHammer()},
        {name: "Polyconic", projection: d3.geo.polyconic().scale(100)},
        {name: "Robinson", projection: d3.geo.robinson()},
        {name: "Sinusoidal", projection: d3.geo.sinusoidal()},
        {name: "Sinu-Mollweide", projection: d3.geo.sinuMollweide()},
        {name: "van der Grinten", projection: d3.geo.vanDerGrinten().scale(75)},
        {name: "van der Grinten IV", projection: d3.geo.vanDerGrinten4().scale(120)},
        {name: "Wagner IV", projection: d3.geo.wagner4()},
        {name: "Wagner VI", projection: d3.geo.wagner6()},
        {name: "Wagner VII", projection: d3.geo.wagner7()},
        {name: "Winkel Tripel", projection: d3.geo.winkel3()}
      ];

      options.forEach(function(o) {
        o.projection.rotate([0, 0]).center([0, 0]);
      });

      var interval = setInterval(loop, 1500),
          i = 0,
          n = options.length - 1;

      var projection = options[i].projection;

      var path = d3.geo.path()
          .projection(projection);

      var graticule = d3.geo.graticule();

      var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height);

      svg.append("defs").append("path")
          .datum({type: "Sphere"})
          .attr("id", "sphere")
          .attr("d", path);

      svg.append("use")
          .attr("class", "stroke")
          .attr("xlink:href", "#sphere");

      svg.append("use")
          .attr("class", "fill")
          .attr("xlink:href", "#sphere");

      svg.append("path")
          .datum(graticule)
          .attr("class", "graticule")
          .attr("d", path);

      d3.json("/mbostock/raw/4090846/world-110m.json", function(error, world) {
        if (error) throw error;

        svg.insert("path", ".graticule")
            .datum(topojson.feature(world, world.objects.land))
            .attr("class", "land")
            .attr("d", path);
      });

      var menu = d3.select("#projection-menu")
          .on("change", change);

      menu.selectAll("option")
          .data(options)
        .enter().append("option")
          .text(function(d) { return d.name; });

      function loop() {
        var j = Math.floor(Math.random() * n);
        menu.property("selectedIndex", i = j + (j >= i));
        update(options[i]);
      }

      function change() {
        clearInterval(interval);
        update(options[this.selectedIndex]);
      }

      function update(option) {
        svg.selectAll("path").transition()
            .duration(750)
            .attrTween("d", projectionTween(projection, projection = option.projection));
      }

      function projectionTween(projection0, projection1) {
        return function(d) {
          var t = 0;

          var projection = d3.geo.projection(project)
              .scale(1)
              .translate([width / 2, height / 2]);

          var path = d3.geo.path()
              .projection(projection);

          function project(λ, φ) {
            λ *= 180 / Math.PI, φ *= 180 / Math.PI;
            var p0 = projection0([λ, φ]), p1 = projection1([λ, φ]);
            return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
          }

          return function(_) {
            t = _;
            return path(d);
          };
        };
      }

    },

    circle: function() {
      //d3.geoArmadillo();

      var width = 960,
          height = 700;

      var velocity = [-.003, .003];

      //for(var i = 0; i < this.model.get("data").length; i++){
      var projection = d3.geo.orthographic()//.data(this.model.get("data"))
          .scale(300);//this.model.get("data")[i].diameter);
        //}

    //    var projection2 = d3.geo.orthographic()//.data(this.model.get("data"))
    //        .scale(300);

      //var projection2 = d3.geo.orthographic().scale(200);

      var path = d3.geo.path()
          .projection(projection);
          //.projection(projection2);

      var svg = d3.select("#planet_surface_area")//.selectAll().data(this.model.get("data")).enter()
      .append("svg")
          //.style("width","500px")
          //.attr("viewBox","0 100 600 200")
          .attr("width", width)//function(d){return d.diameter/3000;})
          .attr("height", height);//function(d){return d.diameter/3000;});

      console.log([d3.geodesic.multilinestring(6),d3.geodesic.multilinestring(6)])

      var feature = svg//.data(this.model.get("data")).enter()
        .append("path")//.attr("transform",function(d){
          //console.log(d);
          //.style("width","300px")
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
      //console.log(path);

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
