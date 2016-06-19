
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

      this.elementScale = "#planet_diameter";

      this.width = this.model.get("width");
      this.height = this.model.get("height");

      //this.svg = d3.select(this.elementScale).append("svg")
        //    .attr("width", this.width)
          //  .attr("height", this.height);

      //this.sizeChart();
      this.planet_table();
      this.draw_planets();
      //this.draw_chart();

      this.size_slider();


    },

    /***********************************************/
    //
    // draw_planets will draw all of planets by creating
    // object (html) tags to call on the planets svgs already
    // in the file.
    //
    /***********************************************/
    draw_planets: function() {

    /***********************************************/
    // dataSorted sorts the data according to the key diameter,
    // from least to greatest, so that the biggest planets are on
    // the back and the smallest are in front.
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
                .data(dataSorted)
            .enter()
                .append("object")
                    .style("position", "absolute")
                    .style("margin-top", function(d) {return -(d.diameter/2)/400+window.innerHeight/2+"px";})
                    .style("margin-left", function(d) {return -(d.diameter/2)/400+window.innerWidth/2+"px";})
                    .attr("width",function(d){ return d.diameter/400; })
                    .attr("height",function(d){ return d.diameter/400; })
                    .attr("type", "image/svg+xml")
                    .attr("id", function(d){ return d.name+"_obj";})
                    .attr("data", function(d) { return d.name+".svg"; });

    /*  this.planets = this.svg.selectAll("circle")
                        .data(this.model.get("data"))
                    .enter()
                        .append("circle");

                        //console.log(this.model.get("data").sort());

      this.planets.attr("cx", this.width/2)//function(d) { return d.distance/2;/*return (i*200)+30;* } )
              .attr("cy", this.height/2)
              .attr("r", function(d,r){ return (d.diameter/2)/500; } )
              .attr("fill", function(d,r) { return d.color; });*/

    },

    /***********************************************/
    //
    // planet_table creates a table using data, and also
    // creates functions for the deselection and selection
    // of the planets.
    //
    /***********************************************/
    planet_table: function() {
      /*this.column = d3.select("body")
                      .data(this.model.get("data"))
                    .enter()
                      .append("tr").attr("id",function(d) {return d.name+"_id"}).append("td")
                      .text(function(d){return d.name;});*/

      var scope = this;

      for(var r = 0; r < this.model.get("data").length; r++) {
        this.value = scope.model.get("data")[r].diameter/400;
        console.log(this.value);
      }

      var pData = this.model.get("data");

      var dataTable = function() {}

      dataTable.prototype.add_element = function(pName) {

          column = $("<td>").attr("id", "tablecolumn_"+pName)
              .text(pName)
              .attr("padding-right","300");

          label = $("<tr>").append(column);
          return label;

      }

      dataTable.prototype.build_list = function(parent, pathIndex) {

          for (var e = 0; e < pathIndex.length; e++) {
              menu = this.add_element(pathIndex[e]);
              $(parent).append(menu);

              /***********************************************/
              // Try tweaking the menu, maybe you can style it better!
              /***********************************************/
              $(menu)
                  .css("background-color","lightgray");

              menu.click([pData[e], menu], click_row);
              menu.mouseover([pData[e], menu], hover_row);

              //menu.mouseout([traj.paths[e], menu], out_row);
          }
      }

      var get_planet_name = function(d) {
          var pName = [];
          for (var i = 0; i < d.length; i++) {
              pName.push(d[i].name);
          }
          return pName;
      }

      var click_row = function(d) {

          var pName = d.data[0].name;
          var menu = d.data[1];

          $(menu)
              .css("background-color", "white");

          d3.select("#"+pName+"_obj").transition().duration(300)
                .style("opacity", 0);

          menu.unbind("mouseover");
          menu.unbind("mouseout");

          menu.click([d.data[0], menu], redraw_planet);
      }

      var redraw_planet = function(d) {

        var pName = d.data[0].name;
        var menu = d.data[1];

        $(menu)
            .css("background-color", "lightgray");

        d3.select("#"+pName+"_obj").transition().duration(300)
              .style("opacity", 1);

              menu.unbind("mouseover");
              menu.unbind("mouseout");

        menu.click([d.data[0], menu], click_row);
      }

      var hover_row = function(d) {

        var pName = d.data[0].name;
        var menu = d.data[1];

        d3.select("#"+pName+"_obj").property(this.value).transition().duration(300)
              .style("opacity", .7)
              .style("margin-top", this.value/*function(d) { return -(d.diameter/2)/400+window.innerHeight/2*/-10+"px")
              .style("margin-left", this.value/*function(d) {return -(d.diameter/2)/400+window.innerWidth/2*/-10+"px")
              .attr("width", d.data[0].diameter/400+20+"px")
              .attr("height", d.data[0].diameter/400+20+"px");

        menu.mouseout([d.data[0], menu], out_row);
      }

      var out_row  = function(d) {

        var pName = d.data[0].name;
        var menu = d.data[1];

        d3.select("#"+pName+"_obj").property(this.value).transition().duration(300)
              .style("opacity", 1)
              .style("margin-top", this.value/*function(d) {return -(d.diameter/2)/400+window.innerHeight/2*/+"px")
              .style("margin-left", this.value/*function(d) {return -(d.diameter/2)/400+window.innerWidth/2*/+"px")
              .attr("width", d.data[0].diameter/400+"px")
              .attr("height", d.data[0].diameter/400+"px");

      }

      var pName = get_planet_name(pData);

      /***********************************************/
      // list.build_list calls the table with the paremeter of
      // the function pName, and the table uses that data for
      // the names of the planets.
      /***********************************************/
      var list = new dataTable();
      list.build_list("#tablebody", pName);

    },

    size_slider: function() {
      var scope = this;
      var interpolateRadius = d3.interpolate(2, 3);

      $(function() {
          $( "#slider" ).slider({
              value: 1,
              min: 0,
              max: 50.01,
              step: .01,
              slide: function( event, ui ) {
                  $( "#amount" ).val( ui.value*100+"%" );
                  for(var r = 0; r < scope.model.get("data").length; r++) {
                    scope.value = interpolateRadius(scope.model.get("data")[r].diameter/400 * ui.value);
                  //  console.log(scope.value);
                  }
                  scope.planetImg.transition().duration(300)
                      .attr("width", function(d) { /*valueTaker(interpolateRadius((d.diameter/400) * ui.value));*/ return interpolateRadius((d.diameter/400) * ui.value); })
                      .attr("height", function(d) { return interpolateRadius((d.diameter/400) * ui.value); })
                      .style("margin-left", function(d) { return interpolateRadius(-(d.diameter/800) * ui.value)+(window.innerWidth/2)+"px"; })
                      .style("margin-top", function(d) { return interpolateRadius(-(d.diameter/800) * ui.value)+(window.innerHeight/2)+"px"; })
                      .style("z-index", -1);

                //  scope.planets.transition().duration(300)
                //      .attr("r",function(d) { return interpolateRadius((d.diameter/400) * ui.value); });

                  //this.width = interpolateRadius((d.diameter/200) * ui.value);
                  //this.height = interpolateRadius((d.diameter/200) * ui.value);
                  //scope.svg.transition.duration(300)
                    //  .attr("width", interpolateRadius((d.diameter/400) * ui.value)+20)
                      //.attr("height", interpolateRadius((d.diameter/400) * ui.value)+20);
              }
          });
          $( "#amount" ).val( $( "#slider" ).slider( "value" ) );
          //$("#slider").style("width", window.innerWidth-150+"px");
      });

      var valueTaker = function(dia) {
        console.log(dia);
      }

    }


  });

  return planetView;


});
