
define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel',
    'ext-lib/jquery-multiselect',
    'ext-lib/dist/jquery.svg.es5.min'

], function($, $ui, d3, backbone, planetModel) {

  var planetView = backbone.View.extend({

    /***********************************************/
    //
    // initialize starts the program, and the code will not
    // run without it. It does not have to be called.
    //
    /***********************************************/
    initialize: function() {

      //this.planet_table();
      this.activate_diameter_sim();
      this.draw_planets();
      this.planet_select();
      this.size_slider();


    },

    activate_diameter_sim: function() {
      $("#diameter").click(function() {
        // By applying .toggle the div #planet_diameter, it
        // allows the user to see the simulation since it is
        // applying style="display: inline", which shows the div
        $("#planet_diameter").show();
        $("#planet_mass").hide();
        $("#planet_surface_area").hide();
        $("#planet_volume").hide();
      });
    },

    /***********************************************/
    //
    // draw_planets will draw all of planets by creating
    // object (html) tags to call on the planet svgs already
    // in the file.
    //
    /***********************************************/
    draw_planets: function() {

      $.widget.bridge('uitooltip', $.ui.tooltip);

      /***********************************************/
      // This file uses data from external files.
      // this.model.get("data") calls to the planetModel.js file,
      // and in turn, the file calls to main.js for the data. To
      // see what the data looks like, uncomment the following log,
      // and open the Javascript Console via broswer menu > View >
      // Developer > Javascript Console (on Chrome or Firefox)
      /* console.log(this.model.get("data")); */
      /***********************************************/

      /***********************************************/
      // dataSorted sorts the data according to the key diameter,
      // from least to greatest, so that the biggest planets are on
      // the back and the smallest are in front. Uncomment the
      // following log to see what the data looks like now.
      /* console.log(dataSorted); */
      /***********************************************/
      var dataSorted = this.model.get("data").sort(
        function(a,b) {
          if (a.diameter > b.diameter) {
            return -1;
          }
          if (a.diameter < b.diameter) {
            return +1;
          }
          // a must be equal to b
          return 0;
        }
      );

      /***********************************************/
      // planetImg is a variable that is all of the svgs. It appends
      // the objects that attach to the svgs in the file with the "data"
      // attributes.
      /***********************************************/
      this.planetImg = d3.select("#planet_svgs").selectAll()
                /***********************************************/
                // The data that goes into .data(), dataSorted, is interated
                // through, like a for loop, so that the keys can be accessed.
                // For example, an interating for loop would look like this:
                //
                // for (var i = 0; i < dataSorted.length; i++) {
                //    dataSorted[i];
                // }
                //
                // The above for loop is actually equal to .data(dataSorted).
                //
                // The appended item (object in this case) can then use the data
                // in its attributes by using a function to pass in infomation like so:
                //
                // function(someVariableName) { return someVariableName.someKey; }
                //
                /***********************************************/
                .data(dataSorted)
            .enter()
                .append("img")
                    .attr("data-toggle", "tooltip")
                    .attr("title", function(d) { return d.name + ", " +"Diameter: "+(d.diameter*1000000).toLocaleString()+" km"; })
                    // the margin push the planet to be in the center of
                    // each other, and the absolute position allows that
                    .style("position", "absolute")
                    .style("margin-top", function(d) {return -(d.diameter/2)/2900+window.innerHeight/2-100+"px";})
                    .style("margin-left", function(d) {return -(d.diameter/2)/2900+window.innerWidth/2+"px";})
                    .style("margin-bottom","200px")
                    .style("margin-right","200px")
                    // width and height are determine the dimensions of
                    // the individual planets
                    .attr("width",function(d){ return d.diameter/2900; })
                    .attr("height",function(d){ return d.diameter/2900; })
                    //.attr("type", "image/svg+xml")
                    .attr("id", function(d){ return d.name+"_obj";})
                    .attr("class","img-circle")
                    // This data attribute, as explained before, calls upon
                    // the svgs in the file, and d.name is the name of all of
                    // the planets. Try uncommenting the log to see what
                    // d.name looks like.
                    .attr("src", function(d) { /*console.log(d.name);*/ return "PlanetSVGs/"+d.name+".svg"; });

          //Additional features added easily with jQuery, a Javascript library
          //
          //.tooltip creates a tooltip for each planet
          $('[data-toggle="tooltip"]').tooltip( );
          //.draggable makes the div containing the svgs draggable
          $("#planet_svgs").draggable();

    },

    planet_select: function() {

      var scope = this;

      var options = d3.select("#planet_diameter").append("select").attr("id","planet_select").attr("multiple","").selectAll()
            .data(this.model.get("data"))
          .enter()
            .append("option")
            .attr("selected", "")
            .attr("id",function(d){return d.name+"_opt";})
            .attr("value", function(d){return d.name;})
            .text(function(d){return d.name;});

      // creates functions for the deselection and selection
      // of the planets
      $("#planet_select").multiselect({

        selectedList: 9,

        click: function(event, ui) {
          $("#"+ui.value+"_obj").toggle("size", 3000);
        },

        checkAll: function() {
          for(var i = 0; i < scope.model.get("data").length; i++) {
            $("#"+scope.model.get("data")[i].name+"_obj").show("size",3000);
          }
        },

        uncheckAll: function() {
          for(var i = 0; i < scope.model.get("data").length; i++) {
            $("#"+scope.model.get("data")[i].name+"_obj").hide("size",3000);
          }
        },

      });

    },

    /***********************************************/
    //
    // size_slider takes advantage of the jQuery-ui slider
    // widget to create a slider that changes the size
    // of the planets.
    //
    /***********************************************/
    size_slider: function() {

      // This varible is to fix a scoping issue that comes as
      // a result of the slider function
      var scope = this;
      var interpolateRadius = d3.interpolate(2, 3);

      $( "#amount" ).val("100%");

      $(function() {
          $( "#slider" ).slider({
              value: 1,
              min: 0,
              max: 50.01,
              step: .01,
              slide: function( event, ui ) {
                  $( "#amount" ).val( Math.floor(ui.value*100)+"%" );
                  // Normally, planetImg would be called as this.planetImg, but that loses its
                  // known value when it is inside more than one function
                  scope.planetImg.transition().duration(300)
                      .attr("width", function(d) { return interpolateRadius((d.diameter/2900) * ui.value)+"px"; })
                      .attr("height", function(d) { return interpolateRadius((d.diameter/2900) * ui.value)+"px"; })
                      .style("margin-left", function(d) { return interpolateRadius(-(d.diameter/2900)/2 * ui.value)+(window.innerWidth/2)+"px"; })
                      .style("margin-top", function(d) { return interpolateRadius(-(d.diameter/2900)/2 * ui.value)+(window.innerHeight/2-100)+"px"; })
                      .style("z-index", -1);
              }
          });
          $( "#amount" ).val( $( "#slider" ).slider('') );
      });

    }


  });

  return planetView;


});
