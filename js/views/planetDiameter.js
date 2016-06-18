
define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel'
], function($, $ui, d3, backbone, planetModel) {

  var planetView = backbone.View.extend({

    initialize: function() {

      this.elementScale = "#planet_diameter";

      this.width = this.model.get("width");
      this.height = this.model.get("height");

      //this.svg = d3.select(this.elementScale).append("svg")
        //    .attr("width", this.width)
          //  .attr("height", this.height);

      //this.sizeChart();
      this.draw_planets();
      //this.draw_chart();

      this.size_slider();


    },



    draw_planets: function() {

      //this.chart.append("svg:svg")
              //.attr("src",)

      //this.svg.append("circle")
      //        .attr()

      //var scope = this;

      /*var u = [];

    for(var planetNumber = 0; planetNumber < 9; planetNumber++){

      u.push(this.model.get("data")[planetNumber].mass);

      //console.log(this.model.get("data")[planetNumber].mass);
    }

    console.log(u);*/
    //return u;

    var dataSorted = this.model.get("data").sort(function(a,b){
      if (a.diameter > b.diameter) {
      return -1;
      }
      if (a.diameter < b.diameter) {
        return +1;
      }
      // a must be equal to b
      return 0; } );

      var scale=400;

      this.planetImg = d3.select(this.elementScale)//.attr("margin", 20)//.append("img")
                .data(dataSorted)
            .enter()
                .append("object")//.style("margin-left",function(d){ return d.distance/10+"px";})
              //  .style("z-index")
                .style("position", "absolute")
                .style("margin-top", function(d) {return -(d.diameter/2)/scale+window.innerHeight/2-200+"px";})
                .style("margin-left", function(d) {return -(d.diameter/2)/scale+window.innerWidth/2+"px";})
                .attr("width",function(d){ return d.diameter/scale; })
                .attr("height",function(d){ return d.diameter/scale; })
                .attr("type", "image/svg+xml")
                .attr("data", function(d) { return d.name+".svg"; });
                //.attr("alt", function(d) { return d.name; });

      /*this.svg.append("circle")
              .attr("width",this.model.get("data")[planetNumber].diameter)
              .attr("height",this.model.get("data")[planetNumber].diameter);*/

    /*  this.planets = this.svg.selectAll("circle")
                        .data(this.model.get("data"))
                    .enter()
                        .append("circle");

                        //console.log(this.model.get("data").sort());

      this.planets.attr("cx", this.width/2)//function(d) { return d.distance/2;/*return (i*200)+30;* } )
              .attr("cy", this.height/2)
              .attr("r", function(d,r){ return (d.diameter/2)/500; } )
              .attr("fill", function(d,r) { return d.color; });*/



        //console.log(this.model.get("data")[planetNumber].name);

        //var planetName = this.model.get("data")[planetNumber].name;
        //this.svg.append("img")
        //        .attr("src",planetName+".svg");
      //}

      //this.planets = d3.selectAll("#planet_diameter");
    },

    size_slider: function() {
      var scope = this;
      var interpolateRadius = d3.interpolate(2, 3);

      $(function() {
          $( "#slider" ).slider({
              value: 1,
              min: -.005,
              max: 40.005,
              step: .005,
              slide: function( event, ui ) {
                  $( "#amount" ).val( ui.value*100+"%" );
                  scope.planetImg.transition().duration(300)
                      .attr("width", function(d) { return interpolateRadius((d.diameter/400) * ui.value); })
                      .attr("height", function(d) { return interpolateRadius((d.diameter/400) * ui.value); })
                      .style("margin-left", function(d) { return interpolateRadius(-(d.diameter/800) * ui.value)+(window.innerWidth/*Height*//2)/** ui.value+150*/+"px"; })
                      .style("margin-top", function(d) { return interpolateRadius(-(d.diameter/800) * ui.value)+(window.innerHeight/2-200)/** ui.value*/+"px"; })
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
          $( "#amount" ).val( $( "#slider" ).slider( "diameter" ) );
          //$("#slider").style("width", window.innerWidth-150+"px");
      });

    }


  });

  return planetView;


});
