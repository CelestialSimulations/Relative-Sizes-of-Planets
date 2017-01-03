define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel',
    'ext-lib/jquery-multiselect',
    'ext-lib/d3-tip'

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
      this.select_planet();
      this.vol_slider();
    },

    activate_volume_sim: function() {
      $("#volume").click(function(){
        $("#planet_volume").show();
        $("#planet_surface_area").hide();
        $("#planet_mass").hide();
        $("#planet_diameter").hide();

      });
    },

    select_planet: function() {
      var scope =this;
      var options = d3.select("#vol_menu").append("select").attr("id","planet_vol_select").attr("multiple","").style("z-index",100).selectAll()
            .data(this.model.get("data"))
          .enter()
            .append("option")
            .attr("selected", "")
            .attr("id",function(d){return d.name+"_vol";})
            .attr("value", function(d){return d.name;})
            .text(function(d){return d.name;});

      $("#planet_vol_select").multiselect({
        selectedList: 9,

        click: function(event, ui) {
          console.log(ui.value);
          $("#"+ui.value+"_vol_svg").toggle();
        },

        checkAll: function() {
          for(var i = 0; i < scope.model.get("data").length; i++) {
            $("#"+scope.model.get("data")[i].name+"_vol_svg").show("fade",1000);
          }
        },

        uncheckAll: function() {
          for(var i = 0; i < scope.model.get("data").length; i++) {
            $("#"+scope.model.get("data")[i].name+"_vol_svg").hide("fade",1000);
          }
        },
      });
    },

    circle: function() {

      var width = 700,
          height = 700;

      var velocity = [-.003, .003];

      var projection = d3.geo.orthographic()
          .scale(200);

      var path = d3.geo.path()
          .projection(projection);

      var scope =this;

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

      var pscale = d3.max(dataSorted).diameter;
      var min = d3.max(dataSorted).diameter;

      var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d, i) {
            console.log(d);                                                                                    // Hint: Use dataSorted[i].diameter and Math.PI
            return "<strong>Name: "+dataSorted[i].name+"</strong><br><span style='color:red'>Mass: " + "calculate me on line 106 (planetVolume.js)!" + "</span>";
          })

      this.svg = d3.select("#vol_svgs").selectAll("svg").data(dataSorted).enter()
      .append("svg")
          .call(tip)
          .style("position","absolute")
          .attr("id",function(d){
            return d.name+"_vol_svg";
          })
          .style("transform",function(d){
            return "scale("+d.diameter/pscale+")"
          })
          .attr("width", width)
          .attr("height", height)
          .style("margin-left",function(d, i){
            //var scaledSize = $("#"+i+"_path").height();
            //console.log(scaledSize);
            return -d.diameter/(pscale/125)+200+"px";
          })
          .style("margin-top", function(d){
            return d.diameter/(pscale/85)-100+"px";
          })


      var feature = this.svg.append("path")
          .datum(d3.geodesic.multilinestring(6))
          .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

      d3.timer(function(elapsed) {
        projection.rotate([elapsed * velocity[0], elapsed * velocity[1]]);
        feature.attr("d", path).attr("id", function(d, i){
          return i+"_path"
        })
      });
    },

    vol_slider: function() {

      // This varible is to fix a scoping issue that comes as
      // a result of the slider function

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

      var pscale = d3.max(dataSorted).diameter;

      var scope = this;
      var interpolateRadius = d3.interpolate(2, 3);
      var pScale = d3.max(this.model.get("data")).diameter/500;

      $( "#vol_amount" ).val("100%");

        $( "#vol_slider" ).slider({
            value: 1,
            min: 0,
            max: 600.01,
            step: .01,
            slide: function( event, ui ) {
                $( "#vol_amount" ).val( Math.floor(ui.value*100)+"%" );
                scope.svg.transition().duration(300)
                    .style("transform",function(d){
                      return "scale("+d.diameter/pscale*ui.value+")"
                    })
                    .style("margin-left",function(d, i){
                      return -d.diameter/((pscale/125))*ui.value+200+"px";
                    })
                    .style("margin-top", function(d){
                      return d.diameter/((pscale/85))*ui.value-100+"px";
                    })
                    .style("z-index", -1);
            }
        });

    }

  });

  return planetView;

});
