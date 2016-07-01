
define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel',
    'lib/jquery-ui/jquery-multiselect',
    'dist/jquery.svg.es5.min'
    //'lib/jquery/dist/jquery.svg.es5.js',
    //'lib/jquery/dist/jquery.svg.js'

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
        //$("#planet_diameter").show("fade",300);
        d3.select("#planet_diameter").transition().duration(500)
              .style("opacity", "1")
              .each("end",function(){
                d3.select(this).style("display","inline");
              });
        d3.select("#planet_mass").transition().duration(500)
              .style("opacity", "0")
              .each("end",function(){
                d3.select(this).style("display","none");
              });
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

      var letmeclosethistabfunction;

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

          /*d3.select("#planet_svgs")
                  //.data(dataSorted)
              //.enter()
                  .append("object")
                  .style("position", "absolute")
                  .style("margin-top", -(dataSorted[1].diameter/2)/400+window.innerHeight/2-70+"px")
                  .style("margin-left", -(dataSorted[1].diameter/2)/400+window.innerWidth/2-150+"px")
                  .attr("width", (dataSorted[1].diameter+100000)/400)
                  .attr("height", (dataSorted[1].diameter+100000)/400)
                  .attr("data", "RingsOfSaturn.svg");

                  console.log(dataSorted[1].diameter);*/

          //Additional features added easily with jQuery-ui.



          //.tooltip creates a tooltip for each planet
          $('[data-toggle="tooltip"]').tooltip( );
          //.draggable makes the div containing the svgs draggable
          $("#planet_svgs").draggable();

          //$("#Jupiter_obj").setSVGStyle("fill","blue");

          //document.querySelector("#Jupiter_obj").getSVGDocument().getElementByID("circle_jupiter").setAttribute("fill","blue");
          //$("#Jupiter_obj").getSVG().find("g circle").attr('fill', 'blue');

    },

    planet_select: function() {

      var scope = this;

      var options = d3.select("#planet_diameter").append("select").attr("multiple","").selectAll()
            .data(this.model.get("data"))
          .enter()
            .append("option")
            .attr("selected", "")
            .attr("id",function(d){return d.name+"_opt";})
            //.attr("prop: selected", true)
            //.attr("select","selected")
            .attr("value", function(d){return d.name;})
            .text(function(d){return d.name});

      //options.hover({})

      $("select").multiselect({

        selectedList: 9,

        click: function(event, ui) {
          /*console.log(ui.value);
          d3.select("#"+ui.value+"_obj").transition().duration(300)
          .style("opacity",".6");*/
          $("#"+ui.value+"_obj").toggle("size", 3000);
        },

        checkAll: function() {
          //$("#"+ui.value+"_obj").toggle("size", 3000);
          for(var i = 0; i < scope.model.get("data").length; i++) {
            $("#"+scope.model.get("data")[i].name+"_obj").show("size",3000);
          }
        },

        uncheckAll: function() {
          for(var i = 0; i < scope.model.get("data").length; i++) {
            $("#"+scope.model.get("data")[i].name+"_obj").hide("size",3000);
          }
          //d3.select("img").transition().dur
          //console.log(ui.value)
          //$("#"+ui.value+"_obj").toggle("size", 3000);
        },

      });

    },

    /***********************************************/
    //
    // planet_table creates a table using data, and also
    // creates functions for the deselection and selection
    // of the planets.
    //
    /***********************************************/
    planet_table: function() {

      var scope = this;

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
          }
      }

      /***********************************************/
      // get_planet_name takes the data it is given as parameter, interates
      // through it, and delivers an array containing only the key name.
      /***********************************************/
      var get_planet_name = function(d) {
          var pName = [];
          for (var i = 0; i < d.length; i++) {
              pName.push(d[i].name);
          }
          // Try uncommenting the following log to see what the resultant
          // data looks like.
          /* console.log.(pName); */
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

        var interpolateRadius = d3.interpolate(2, 3);

        d3.select("#"+pName+"_obj").transition().duration(300)
              .style("opacity", .7)
              .style("margin-top", function(d) { return -(d.diameter/2)/400+window.innerHeight/2-10+"px";} )
              .style("margin-left", function(d) {return -(d.diameter/2)/400+window.innerWidth/2-10+"px";} )
              .attr("width", d.data[0].diameter/400+20+"px")
              .attr("height", d.data[0].diameter/400+20+"px");

        menu.mouseout([d.data[0], menu], out_row);
      }

      var out_row  = function(d) {

        var pName = d.data[0].name;
        var menu = d.data[1];

        d3.select("#"+pName+"_obj").property(this.value).transition().duration(300)
              .style("opacity", 1)
              .style("margin-top", function(d) {return -(d.diameter/2)/400+window.innerHeight/2+"px";} )
              .style("margin-left", function(d) {return -(d.diameter/2)/400+window.innerWidth/2+"px";} )
              .attr("width", d.data[0].diameter/400+"px")
              .attr("height", d.data[0].diameter/400+"px");

      }

      var pName = get_planet_name(pData);

      /***********************************************/
      // list calls the table with the paremeter of
      // the function pName, and the table uses that data for
      // the names of the planets.
      /***********************************************/
      var list = new dataTable().build_list("#tablebody", pName);

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
