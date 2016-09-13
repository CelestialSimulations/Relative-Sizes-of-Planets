
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

      var test = function() {
        console.log("again");
        d3.select("body").on("mouseover", function(){
          test();
        });
      }
      //test();
      //console.log(this.model.get("data"));

      //d3.select("#rot").style("transform-origin","360px 108px");

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

      var weights = [305, 305];
      var weights2 = [305, 305];

      var angles = [0, 0];

      if(angles.length > 2) {
        angles.shift();
      }
      //console.log(weights[1]);

      //make asteroid program w/ d3

      d3.select("#drop_btn1").on("click", function() {

        $("#rot").attr("style", "transform-origin: 360px 108px; transform: rotate("+angles[1]+"deg); position: absolute; width: 720px;");

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
                .style("margin-top",function(){
                  if(weights.length > 2) {
                    weights.shift();
                  }
                  return weights[1]+"px";
                })
                .each("end",function(){
                  d3.select(".original1").transition().duration(1500)
                      //.style("margin-left",function(i){
                      //  return -i*10+"px";
                      //})
                      .style("margin-top", function(d) {

                        pArray1DropBtn1.push(d.mass);
                        var weight = d3.sum(pArray1DropBtn1)-d3.sum(pArray1DropBtn2);

                        weights.push(weight+305);

                        d3.selectAll(".original1").transition().duration(1500)
                              .style("width", "80px")
                              .style("margin-left",function(d, i){
                                return i*80+"px";
                              })
                              .style("margin-top",weight+315+"px");

                        d3.selectAll(".original2").transition().duration(1500)
                                .style("margin-top",-weight+315+"px");

                        d3.select("#w1").transition().duration(1500)
                              //.style("left",weight/5+"px")
                              //.style("right", -degangle+"px")
                              .style("top",weight+"px");

                        d3.select("#w2").transition().duration(1500)
                                .style("top",-weight+"px");

                        var w1 = document.getElementById('scale');

                      	var originx = w1.getBoundingClientRect().left;// + 360;
                      	//var originy = w1.getBoundingClientRect().top + 108;

                        var angle = -Math.atan2(weight, originx);//-Math.PI/6;
                        var degangle = (angle*(180/Math.PI));

                        angles.push(degangle);

                        d3.select("#rot").transition().duration(1500)
                                .style("transform","rotate("+degangle+"deg)");

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
              .style("margin-top",function(d) {
                if(weights2.length > 2) {
                  weights2.shift();
                }
                return weights2[1]+"px";
              })
              .each("end",function(){

                d3.select(".original2").transition().duration(1500)
                    .style("margin-top", function(d) {
                      pArray1DropBtn2.push(d.mass);

                      //d3.select(".original1").transition().duration(1500)
                      //    .style("margin-top", function(d){

                        //    var weight = d3.sum(pArray1DropBtn1)-d3.sum(pArray1DropBtn2);
                            //weights.push(weight+305);

                            //d3.selectAll(".original1").transition().duration(1500)
                              //      .style("margin-top",-weight+315+"px");

                            //d3.select("#w1").transition().duration(1500)
                              //      .style("top",weight+"px");

                        //    return weight+315+"px";
                      //});

                      var weight = d3.sum(pArray1DropBtn2)-d3.sum(pArray1DropBtn1);//-d3.sum(p3);
                      weights2.push(weight+305);

                      d3.selectAll(".original1").transition().duration(1500)
                              .style("margin-top",-weight+315+"px");

                      d3.selectAll(".original2").transition().duration(1500)
                              .style("width", "80px")
                              .style("margin-left",function(d, i){
                                console.log(i);
                                return i*80+"px";
                              })
                              .style("margin-top",weight+315+"px");

                      d3.select("#w1").transition().duration(1500)
                              .style("top",-weight+"px");

                      d3.select("#w2").transition().duration(1500)
                              .style("top",weight+"px");

                      var w1 = document.getElementById('w2');

                      var originx = w1.getBoundingClientRect().left;//+50;// + 360;
                      //var originy = w1.getBoundingClientRect().top + 108;

                      var angle = Math.atan2(weight, originx);//+Math.PI/5;
                      var degangle = (angle*(180/Math.PI));

                      console.log(degangle);
                      //console.log(originx);

                      d3.select("#rot").transition().duration(1500)
                              .style("transform","rotate("+degangle+"deg)");


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
    }


  });

  return planetView;


});
