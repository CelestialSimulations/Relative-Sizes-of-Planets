
define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel',
    'js/views/addPlanet',
    'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'
    //'slick/slick.min.js'
    //'earth'
], function($, $ui, d3, backbone, planetModel, addPlanetData) {

  var planetView = backbone.View.extend({

    initialize: function() {

      //console.log(addPlanetData);

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
        $("#planet_mass").show();
        $("#planet_diameter").hide();
        $("#planet_surface_area").hide();
        $("#planet_volume").hide();
        /*d3.select("#planet_diameter").transition().duration(500)
              .style("opacity", "0")
              .each("end",function(){
                d3.select(this).style("display","none");
              });
        d3.select("#planet_mass").transition().duration(500)
              .style("opacity", "1")
              .each("end",function(){
                d3.select(this).style("display","inline");
              });*/
      });
    //}
    },

    draw_planets: function() {
      //console.log(this.model.get("data"));

      d3.select("#rot").style("transform-origin","360px 108px");

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
                            //.style("position","absolute")
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
                            //.style("position","absolute")
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

      //$("#planet_holder1").insertAfter("img");

      $("#myCarousel").carousel({interval: false});
      $("#carousel2").carousel({interval: false});


    },

    planet_drop: function() {
      var scope = this;

      var pArray1DropBtn1 = [];
      var pArray1DropBtn2 = [];

      //make asteroid program w/ d3

      d3.select("#drop_btn1").on("click", function() {

          $("#ci1 div.active img").addClass("original1").removeClass("copy1").clone(true).removeClass("original1").addClass("copy1").appendTo("#ci1 div.active");
          $("#img_holder1").append($(".original1"));

          d3.selectAll(".copy1").data([d3.selectAll(".original1")[0][0].__data__]);

          var o1 = d3.select(".original1").on("click", function(d, i){

                  pArray1DropBtn1.splice(i, 1);

                  d3.selectAll(".original1").transition().duration(700)
                        //.style("margin-left",function(d, i){
                          //d3.select(this).transition().duration(700).style("margin-left", i*100+"px");
                        //  return i*100+"px";
                        //})
                        .style("margin-top", d3.sum(pArray1DropBtn1)-d3.sum(pArray1DropBtn2)+300+"px");

                  d3.selectAll(".original2").transition().duration(700)
                        .style("margin-top", d3.sum(pArray1DropBtn2)-d3.sum(pArray1DropBtn1)+300+"px");

                  d3.select(this).transition().duration(300)
                        //.style("margin-left",function(d, i){
                        //  return (i)*100+"px";
                        //})
                        //.style("margin-left", "0px")
                        .style("opacity", "0")
                        .remove();
                        //.exit();

                  //var index = pArray1DropBtn1.indexOf(d.mass);
                  //if (index > -1) {
                      //pArray1DropBtn1.splice(i, 1);
                  //}

                  //console.log(index)
                })
                /*.on("mouseover", function(){
                  d3.select(this).transition().style("margin-left","-5px").attr("width","110px").attr("height","110px");
                })
                .on("mouseout", function(){
                  d3.select(this).transition().style("margin-left","0px").attr("width","100px").attr("height","100px");
                })*/
          .transition().duration(300).ease("linear")
                .style("float","left")
                .style("position","absolute")
                .style("margin-top","305px")
                .each("end",function(){
                  d3.select(".original1").transition().duration(1500)
                      //.style("margin-left",function(i){
                      //  return -i*10+"px";
                      //})
                      .style("margin-top", function(d) {

                        pArray1DropBtn1.push(d.mass);
                        var weight = d3.sum(pArray1DropBtn1)-d3.sum(pArray1DropBtn2);

                        d3.selectAll(".original1").transition().duration(1500)
                              .style("width", "80px")//function(d,i){
                                //return (60-(i*30))+20+"px";
                              //})
                              .style("margin-left",function(d, i){
                                //console.log(i);
                                return i*80+"px";
                              })
                              .style("margin-top",weight+315+"px");

                        d3.select(".original2").transition().duration(1500)
                            .style("margin-top", function(d){

                              var weight = d3.sum(pArray1DropBtn2)-d3.sum(pArray1DropBtn1);

                              d3.selectAll(".original2").transition().duration(1500)
                                      .style("margin-top",weight+315+"px");

                              d3.select("#w2").transition().duration(1500)
                                      .style("top",weight+"px");

                              return weight+315+"px";
                        });

                        d3.select("#w1").transition().duration(1500)
                            //  .style("left",weight/10+"px")
                              .style("top",weight+"px");

                        var element = document.getElementById('w1');

                      	var originx = element.getBoundingClientRect().left;// + 360;
                      	var originy = element.getBoundingClientRect().top + 108;

                        var angle = -Math.atan2(weight, originx);//+Math.PI/5;
                        var degangle = (angle*(180/Math.PI));

                        console.log(degangle);
                        //console.log(originx);

                        d3.select("#rot").transition().duration(1500)
                                .style("transform","rotate("+degangle+"deg)");

                              //.attr("y",weight+400);
                        //d3.select("#cweight").transition().duration(1500)
                        //      .attr("cy", weight+400);

                        return weight+315+"px";
                      });
                });
      });


      d3.select("#drop_btn2").on("click", function(){

        $("#ci2 div.active img").addClass("original2").removeClass("copy2").clone(true).attr("class","copy2").appendTo("#ci2 div.active");
        $("#img_holder2").append($(".original2"));

        d3.selectAll(".copy2").data([$(".original2")[0].__data__]);

        var o2 = d3.select(".original2").on("click", function(){
          d3.select(this).transition().duration(300)
                .style("opacity", "0")
                .remove();
              })
          .transition().duration(1000)
              .style("float","right")
              .style("position","absolute")
              .style("margin-top","305px")
              .each("end",function(){

                d3.select(".original2").transition().duration(1500)
                    .style("margin-top", function(d) {
                      pArray1DropBtn2.push(d.mass);

                      d3.select(".original1").transition().duration(1500)
                          .style("margin-top", function(d){

                            var weight = d3.sum(pArray1DropBtn1)-d3.sum(pArray1DropBtn2);

                            d3.selectAll(".original1").transition().duration(1500)
                                    .style("margin-top",weight+315+"px");

                            d3.select("#w1").transition().duration(1500)
                                    .style("top",weight+"px");

                            return weight+315+"px";
                      });

                      var weight = d3.sum(pArray1DropBtn2)-d3.sum(pArray1DropBtn1);//-d3.sum(p3);

                      d3.selectAll(".original2").transition().duration(1500)
                              .style("width", "80px")
                              .style("margin-left",function(d, i){
                                console.log(i);
                                return i*80+"px";
                              })
                              .style("margin-top",weight+315+"px");

                      d3.select("#w2").transition().duration(1500)
                              .style("top",weight+"px");

                      return weight+315+"px";
                    });
              });

      });


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
