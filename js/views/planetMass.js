
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
      this.remove_planet_on_click();

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
        //$("#planet_mass").show();
        //$("#planet_diameter").hide();
        d3.select("#planet_diameter").transition()
              .style("opacity", "0")
              .each("end",function(){
                d3.select(this).style("display","none");
              });
        d3.select("#planet_mass").transition()
              .style("opacity", "1")
              .each("end",function(){
                d3.select(this).style("display","inline");
              });
      });
    //}
    },

    draw_planets: function() {

      var pData = this.model.get("data");

      this.passive_planets = d3.select("#ci1").selectAll()
                         .data(pData)
                      .enter()
                         .append("div")
                            .attr("class","item")
                            .attr("id",function(d) {
                              //d3.select("#Mercury_div_1").attr("class","item active");
                              return d.name+"_div_1";
                            })
                            //.attr("class","svgs")
                         .append("img")
                            .attr("class","img-circle")
                            //.attr("id",function(d) { return d.name+"_img";})
                            //.style("margin-top", function(d) { return d.mass/3-200+"px";})
                            .attr("width","100px")
                            .attr("height", "100px")
                            .attr("src", function(d) { return "PlanetSVGs/"+d.name+".svg";});

      d3.selectAll("#"+pData[0].name+"_div_1").attr("class","item active");


      this.passive_planets_2 = d3.select("#ci2").selectAll()
                         .data(pData)
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

      d3.select("#"+pData[0].name+"_div_2").attr("class","item active");


      var plut = $('div.item').has('[src="PlanetSVGs/Pluto.svg"]');

      var last_planet = pData[pData.length-1].name;

      $("#l, #r").insertAfter("#"+last_planet+"_div_1");
      $("#l2, #r2").insertAfter("#"+last_planet+"_div_2");

      $("#myCarousel").carousel({interval: false});
      $("#carousel2").carousel({interval: false});


    },

    planet_drop: function() {
      var scope = this;

      //this.weight_1;
      //this.weight_2;


      var pArray1DropBtn1 = [];
      var pArray2DropBtn1 = [];
      //d3.select("#drop_btn1").data(this.model.get("data"));//.enter();

      d3.select("#drop_btn1").on("click", function() {

      //  console.log($("#ci1 div.active img")[0].__data__);

        //console.log(d);

          $("#ci1 div.active img").addClass("original1").removeClass("copy1").clone(true).removeClass("original1").addClass("copy1").appendTo("#ci1 div.active");
          $("#img_holder1").append($(".original1"));
          //$(".dropped").clone().appendTo("div.active");
          //$("div.active").toggle();

          //console.log(d3.selectAll("#ci1 div.active img")[0]);
          //d3.select()

          //d3.select(".original1").attr("id", function(d){d.name+"_id"});

          d3.selectAll(".copy1").data([d3.selectAll(".original1")[0][0].__data__]);//.enter();

          //console.log($(".copy1"));

          //var copy = $.extend({}, ".copy1", $(".original1"));
          //console.log(copy[0]);
          //d3.select(".copy1").data(this.model.get("data"))

          //var oriattr = $(".original1").prop("attributes");
          //$.each(oriattr, function(){
            //$(".copy1").attr(this.__data__);
          //});



          //this.weight_1 = $(".original1")[0].__data__.mass;

          //To Do:
          // Work on selections
          // Deep clone


          var o1 = d3.select(".original1").on("click", function(){
            d3.select(this).transition().duration(300)
                  .style("opacity", "0")
                  .remove();
                })
          .transition().duration(500)
                .style("float","left")
                .style("margin-top","300px")
                //.style("margin-bottom", "100px")
                .each("end",function(){
                  d3.select(".original1").transition().duration(1500)
                      .style("margin-top", function(d) {
                        var scope2 = this;
                        this.v1 = d.mass;
                        //d3.selectAll(".copy1").data(d);
                        var second = d3.select(".original2").transition().duration(1500)
                            .style("margin-top", function(d){
                              this.v2 = d.mass;
                              var v1 = scope2.v1 || 0;
                              //console.log(scope2.v1-this.v2);
                              pArray2DropBtn1.push(d.mass-v1);
                              var sum = d3.sum(pArray2DropBtn1);
                              //console.log(pArray2DropBtn1);
                              //console.log(v1);
                              d3.selectAll(".original2").attr("margin-top",sum+300);
                              return sum+300+"px";
                        });
                        var s = second[0][0] || 0;
                        var sd = s.__data__ || 0;
                        var m2 = sd.mass || 0;

                        pArray1DropBtn1.push(d.mass-m2);
                        var sum = d3.sum(pArray1DropBtn1);
                        //console.log(sum)
                        //console.log(pArray1DropBtn1);
                        d3.selectAll(".original1").attr("margin-top",sum+300);

                        return sum+300+"px";
                      });
                });

        //var generatedPlanetData = d3.select(".original1")[0][0].__data__.mass;

        //pArray1DropBtn1.push(generatedPlanetData);

        //d3.sum(pArray1DropBtn1);

        //once get array of mass data that adds to itself when drop btn clicked
        //use d3.sum and add that variable to the above ^

        //console.log(generatedPlanetData);
        //console.log(pArray1DropBtn1);
        //console.log(d3.sum(pArray1DropBtn1));
                //.style("margin-top", 300+(weight_1-weight_2)/2+"px");///*scope.model.get("data")[i].mass/3+"px"*/);

        //}
        /*$('.item active')*///scope.planet1.transition().duration(/*function(d){return d.mass}*/300)
                  //.style("margin-top", function(d) { return d.mass/3+"px";});

          //$("drop_btn").click([$(".original1"),$(".original2")],click_copy);
      });

      var pArray1DropBtn2 = [];
      var pArray2DropBtn2 = [];

      $("#drop_btn2").click(function(){

        $("#ci2 div.active img").addClass("original2").removeClass("copy2").clone(true).attr("class","copy2").appendTo("#ci2 div.active");
        $("#img_holder2").append($(".original2"));

        //console.log(d3.select(".original2")[0][0].__data__);

        d3.selectAll(".copy2").data([$(".original2")[0].__data__]);

        //this.weight_2 = $(".original2")[0].__data__.mass;

        var o2 = d3.select(".original2").transition().duration(1000)
              .style("float","right")
              .style("margin-top","300px")
              //.style("margin-bottom", "100px")
              .each("end",function(){
                d3.select(".original2").transition().duration(1500)
                    .style("margin-top", function(d) {
                      var scope2 = this;
                      this.v1 = d.mass;
                      var second = d3.select(".original1").transition().duration(1500)
                          .style("margin-top", function(d){
                            this.v2 = d.mass;
                            var v1 = scope2.v1 || 0;

                            pArray2DropBtn2.push(d.mass-v1);
                            var sum = d3.sum(pArray2DropBtn2);
                            //console.log(scope2.v1-this.v2);
                            d3.selectAll(".original1").attr("margin-top",sum+300);
                            return sum+300+"px";
                      });
                      var s = second[0][0] || 0;
                      var sd = s.__data__ || 0;
                      //console.log(second[0][0].__data__.mass);
                      var m2 = sd.mass || 0;
                      //m2 = m2 || 0;

                      pArray1DropBtn2.push(d.mass-m2);
                      var sum = d3.sum(pArray1DropBtn2);
                      //console.log(sum)
                      //console.log(pArray1DropBtn2);
                      d3.selectAll(".original2").attr("margin-top",sum+300);

                      return sum+300+"px";
                    });
              });

      });

      //console.log(scope.weight_1);

      /*var click_copy = function(c) {
        console.log(c);
      }*/

      //click_copy();

    },

    remove_planet_on_click: function() {
      d3.select(".original1").on("click", function(){
        console.log("reme");
        d3.select(this).transition().duration(300)
              .style("opacity", "0")
              .remove();
      });
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
