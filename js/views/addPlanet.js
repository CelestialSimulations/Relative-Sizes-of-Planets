
define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel',
    //'js/views/planetDiameter',
    //'js/views/planetMass'

], function($, $ui, d3, backbone, planetModel/*, pD, pMa*/) {

  var planetView = backbone.View.extend({

    /***********************************************/
    //
    // initialize starts the program, and the code will not
    // run without it. It does not have to be called.
    //
    /***********************************************/
    initialize: function() {

      this.inputData();
      //console.log(u);

    },

    inputData: function() {
      var scope = this;

      var alteredData = scope.model.get("data");

      $("#save_btn").click(function(event) {
        var newName = $("#new_name_getter").val();
        var newMass = $("#new_mass_getter").val();
        var newDiameter = $("#new_diameter_getter").val();

        console.log("N: "+newName);
        console.log("M: "+$("#new_mass_getter").val());
        console.log("D: "+$("#new_diameter_getter").val());

        var newObject = {"name": newName, "mass": newMass, "diameter": newDiameter};
        //console.log(newObject.name);

        alteredData.push(newObject);

        console.log(alteredData);



        /*d3.select("#ci1")
            //.data(alteredData)
          //.enter()
            .append("div")
              .attr("class","item")
              .attr("id", newObject.name+"_div1")
            .append("img")
              .attr("class","img-circle")
              .attr("width","100px")
              .attr("height", "100px")
              .attr("src", "PlanetSVGs/"+newObject.name+".svg");*/


        //console.log(d3.select("#ci1"));
        //this.pm =  new planetModel (alteredData);

        //this.pd = new pD( "model": {this.pm} );
        //this.ma = new pMa( "model": {this.pm} );

        return alteredData;
      });
      $("#save_btn").click(function(event){
        console.log(event.result);
      });

      //console.log(input);

      //return "u";

      //d3.select(".modal_body").append("input")
      //d3.select("#c1").selectAll().data(alteredData).attr("class","update");
    }


  });

  return planetView;


});
