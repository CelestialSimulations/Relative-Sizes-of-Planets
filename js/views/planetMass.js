
define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel',
    'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'
    //'slick/slick.min.js'
    //'earth'
], function($, $ui, d3, backbone, planetModel) {

  var planetView = backbone.View.extend({

    initialize: function() {

      this.activate_mass_sim();
      this.draw_planets();
      this.planet_drop();

      //this.elementMass = "#planet_mass";

      //this.width = this.model.get("width");
      //this.height = this.model.get("height");

      //this.draw_planets();
      //this.draw_chart();
      //this.planet_sliding();
      //this.draw_svg_planets();
      //this.weight_scale();

      /*this.sizeChart();
      this.axis();
      this.scale();
      this.chart();
      this.bar_width();
      this.draw_bars();
      this.model.set(this.type(this.model.get("data")));*/

      //this.draw_rects_chart();
      //this.draw_rects();
    },

    activate_mass_sim: function() {
      //if(d3.select("#planet_diameter").attr("display","inline")){
      $("#mass").click(function(){
        $("#planet_mass").toggle("fade", 300);
        $("#planet_diameter").toggle("fade", 300);
      });
    //}
    },

    draw_planets: function() {

      //$("#myCarousel").carousel({interval: false});
      //$("#carousel2").carousel({interval: false});


      /*this.active_planet = d3.select("#ci1")
                              //.data(this.model.get("data"))
                           //.enter()
                              .append("div")
                                .attr("class","item active")
                              .append("img")
                                .attr("width","100px")
                                .attr("height", "100px")
                                .attr("src","PlanetSVGs/Mercury.svg");*/

      //d3.select("#Mercury_div_1").attr("class","active");

      this.passive_planets = d3.select("#ci1").selectAll()
                         .data(this.model.get("data"))
                      .enter()
                         .append("div")
                            .attr("class","item")
                            .attr("id",function(d) { return d.name+"_div_1";})
                            //.attr("class","svgs")
                         .append("img")
                            .attr("class","img-circle")
                            //.attr("id",function(d) { return d.name+"_img";})
                            //.style("margin-top", function(d) { return d.mass/3-200+"px";})
                            .attr("width","100px")
                            .attr("height", "100px")
                            .attr("src", function(d) { return "PlanetSVGs/"+d.name+".svg";});

      d3.select("#Mercury_div_1").attr("class","item active");

      /*this.active_planet_2 = d3.select("#ci2")
                              //.data(this.model.get("data"))
                           //.enter()
                              .append("div")
                                .attr("class","item active")
                              .append("img")
                                .attr("width","100px")
                                .attr("height", "100px")
                                .attr("src","PlanetSVGs/Mercury.svg");*/

      this.passive_planets_2 = d3.select("#ci2").selectAll()
                         .data(this.model.get("data"))
                      .enter()
                         .append("div")
                            .attr("class","item")
                            .attr("id",function(d) { return d.name+"_div_2";})
                            //.attr("class","svgs")
                         .append("img")
                            .attr("class","img-circle")
                            //.attr("id",function(d) { return d.name+"_img";})
                            //.style("margin-top", function(d) { return d.mass/3-200+"px";})
                            .attr("width","100px")
                            .attr("height", "100px")
                            .attr("src", function(d) { return "PlanetSVGs/"+d.name+".svg";});

      d3.select("#Mercury_div_2").attr("class","item active");


      var plut = $('div.item').has('[src="PlanetSVGs/Pluto.svg"]');

      $("#l, #r").insertAfter("#Pluto_div_1");
      $("#l2, #r2").insertAfter("#Pluto_div_2");

      $("#myCarousel").carousel({interval: false});
      $("#carousel2").carousel({interval: false});


      /*this.planet1 = d3.select("#mass_planet_svgs").selectAll()
                         .data(this.model.get("data"))
                      .enter()
                         .append("img")
                         .attr("id",function(d) { return d.name+"_img";})
                         //.style("margin-top", function(d) { return d.mass/3-200+"px";})
                         .attr("width","100px")
                         .attr("height", "100px")
                         .attr("src", function(d) { return "PlanetSVGs/"+d.name+".svg";});*/

     /*this.planet2 = d3.select("#planet_mass")
                        .append("img")
                        .attr("src","PlanetSVGs/Earth.svg")
                        .attr("width","100px")
                        .attr("height", "100px");*/
    },

    planet_drop: function() {
      var scope = this;

      //this.weight_1;
      //this.weight_2;
      $("#drop_btn1").click(function() {

          $("#ci1 div.active img").attr("class","original1").clone().attr("class","copy1").appendTo("#ci1 div.active");
          $(".original1").insertAfter("#myCarousel");//.addClass("dropped");//.insertAfter("#l");
          //$(".dropped").clone().appendTo("div.active");
          //$("div.active").toggle();

          //var oriattr = $(".original1").prop("attributes");
          //$.each(oriattr, function(){
            //$(".copy1").attr(this.__data__);
          //});



          //this.weight_1 = $(".original1")[0].__data__.mass;

          d3.select(".original1, .original2").attr("id",function(d){
            console.log(d.mass); return "1";
          });


          //console.log("S1: "+($(".original1")[0].__data__.mass-$(".original2")[0].__data__.mass)+" S2: "+(this.weight_2-this.weight_1)/2);

        //for( var i = 0; i < scope.model.get("data").length; i++ ) {
          //console.log(scope.model.get("data")[i].mass);

          //d3.select(".original1").transition().duration(1000)
            //      .style("margin-top","300px");
          //d3.select(".original2").transition().duration(1000)
            //      .style("margin-top","300px");

          var o1 = d3.select(".original1").transition().duration(500)
                .style("float","left")
                //.style("margin-right",)
                //function(d){console.log(d)}
                //.style("position", "absolute")
                //.attr("width",function (d){return d.diameter/400+"px"})
                //.attr("height",function (d){return d.diameter/400+"px"})
                //.style("margin-left",function(d){return -d.diameter/800+50+"px"})
                .style("margin-top","300px")
                //.style("margin-bottom", "100px")
                .each("end",function(){
                  d3.select(this).transition().duration(1500)
                      .style("margin-top", 400/*+(weight_1-weight_2)*/+"px");
                });
                //.style("margin-top", 300+(weight_1-weight_2)/2+"px");///*scope.model.get("data")[i].mass/3+"px"*/);

        //}
        /*$('.item active')*///scope.planet1.transition().duration(/*function(d){return d.mass}*/300)
                  //.style("margin-top", function(d) { return d.mass/3+"px";});

          //$("drop_btn").click([$(".original1"),$(".original2")],click_copy);
      });

      $("#drop_btn2").click(function(){

        $("#ci2 div.active img").attr("class","original2").clone().attr("class","copy2").appendTo("#ci2 div.active");
        $(".original2").insertAfter("#carousel2");

        //this.weight_2 = $(".original2")[0].__data__.mass;

        var o2 = d3.select(".original2").transition().duration(1000)
              .style("float","right")
              .style("margin-top","300px")
              //.style("margin-bottom", "100px")
              .each("end",function(){
                d3.select(this).transition().duration(1500)
                    .style("margin-top", 400+/*(weight_2-weight_1)+*/"px");
              });

      });

      //console.log(scope.weight_1);

      /*var click_copy = function(c) {
        console.log(c);
      }*/

      //click_copy();

    },
/*
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
        }*


    },

    draw_svg_planets: function() {

      //this.svg = d3.select(this).append("g")

    },

    draw_chart: function() {
      this.svg = d3.select(this.elementMass).append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
    },

    /*draw_rects_chart: function() {
      this.chart = d3.select(".chart")
          .attr("width", width + this.margin.left + this.margin.right)
          .attr("height", height + this.margin.top + this.margin.bottom)
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    },

    draw_rects: function() {

      /*var scope = this;
      this.chart.selectAll(".bar")
          .data(scope.model.get("data").splice(1,2))
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return scope.x(d.name); })
          .attr("y", function(d) { return scope.y(d.mass); })
          .attr("height", function(d) { return height-scope.y(d.mass); })
          .attr("width", scope.x.rangeBand())*
    },*

    sizeChart: function(){
        this.margin = {top: 20, right: 30, bottom: 30, left: 40},
            //console.log(document.
            width = 960 - this.margin.left - this.margin.right,
            height = 2000 - this.margin.top - this.margin.bottom;
      },


    axis: function(){
      var xAxis = d3.svg.axis()
          .scale(this.x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(this.y)
          .orient("left")
          .ticks(100, "lb");
    },

    scale: function(){
      this.x = d3.scale.ordinal()
          .rangeRoundBands([0, width], 0);

      this.y = d3.scale.linear()
          .range([height, 0]);
    },

    chart: function(){

      this.chart = d3.select(".chart")
          .attr("width", width + this.margin.left + this.margin.right)
          .attr("height", height + this.margin.top + this.margin.bottom)
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      //console.log(this.model.get("data").splice(1,2).map(function(d) { return d.name; }));
      //var t = this.model.get("data").splice(1,2);
      //console.log(this.model.get("data"));
      this.x.domain(this.model.get("data").map(function(d) { return d.name; }));
      this.y.domain([0, d3.max(this.model.get("data"), function(d) { return d.mass; })]);

    },

    bar_width: function(){
      var barWidth = this.width / this.model.get("data").length;
    },

    draw_bars: function() {

      var scope = this;

      this.xAxis = d3.svg.axis()
          .scale(this.x)
          .orient("bottom");

      this.yAxis = d3.svg.axis()
          .scale(this.y)
          .orient("left")
          .ticks(100, "lb");

      this.chart.selectAll(".bar")
          .data(scope.model.get("data").splice(1,2))
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return scope.x(d.name); })
          .attr("y", function(d) { return scope.y(d.mass); })
          .attr("height", function(d) { return height-scope.y(d.mass); })
          .attr("width", scope.x.rangeBand())

      this.chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(this.xAxis);

      this.chart.append("g")
          .attr("class", "y axis")
          .call(this.yAxis);

    },

    type: function(d) {
      d.mass = +d.mass; // coerce to number
      return d;
    }*/


  });

  return planetView;


});
