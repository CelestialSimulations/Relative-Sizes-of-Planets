/*
/ Main script that acts as the entry point for the application
*/

requirejs.config({
    baseUrl:'',
    paths: {
        backbone: 'lib/backbone/backbone-min',
        bootstrap: 'lib/bootstrap/js/bootstrap.min',
        d3: 'lib/d3/d3.min',
        jquery: 'lib/jquery/jquery.min',
        jqueryui: 'lib/jquery-ui/jquery-ui.min',
        underscore: 'lib/underscore/underscore-min'
    }
})

// Main application single entry point
requirejs([
    'jquery',
    'd3',
    'js/models/planetModel',
    'js/views/planetMass',
    'js/views/planetDiameter',
    'js/views/addPlanet',
    'js/views/planetSurfaceArea',
    'js/views/planetVolume'

],function($, d3, planetModel, planetMass, planetDiameter, addPlanet, planetSurfaceArea, planetVolume) {

        var planetData =  {"data":[
        {name: "Sun",	           mass: 1988500,     diameter: 1392000},
        {name: "Mercury",	       mass: 0.330,       diameter: 4879 },
        {name: "Venus",	         mass: 4.87,        diameter: 12104 },
        {name: "Earth",      	   mass: 5.97,        diameter: 12756 },
        {name: "Moon",	         mass: 0.073,       diameter: 3475 },
        {name: "Mars",	         mass: 0.642,       diameter: 6792 },
        {name: "Jupiter",	       mass: 1898,        diameter: 142984 },
        {name: "Saturn",      	 mass: 568,         diameter: 120536 },
        {name: "Uranus",	       mass: 86.8,        diameter: 51118 },
        {name: "Neptune",	       mass: 102,         diameter: 49528 },
        {name: "Pluto",    	     mass: 0.0146,      diameter: 2370 }]
      };

        //var scope = this;

        /*var alteredData = planetData;

        d3.select("#save_btn").on("click", function() {
          var newName = $("#new_name_getter").val();
          var newMass = $("#new_mass_getter").val();
          var newDiameter = $("#new_diameter_getter").val();

          console.log("N: "+newName);
          console.log("M: "+$("#new_mass_getter").val());
          console.log("D: "+$("#new_diameter_getter").val());

          var newObject = {"name": newName, "mass": newMass, "diameter": newDiameter};
          //console.log(newObject.name);

          planetData.push(newObject);
          console.log(planetData);
        });*/

      this.planet_model = new planetModel (planetData);
      //console.log(this.planet_model);

      this.add_planet_function = new addPlanet( { "model" : this.planet_model} );

      this.planet_surface_area_sim = new planetSurfaceArea( { "model": this.planet_model } );

      this.planet_volume_sim = new planetVolume( { "model": this.planet_model } );

      this.planet_mass_sim = new planetMass( { "model" : this.planet_model } );
      this.planet_diameter_sim = new planetDiameter( { "model" : this.planet_model } );


});
