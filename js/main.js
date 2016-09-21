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
        {name: "Earth",      	   mass: 5.97,        diameter: 12756 },
        ]
      };

      this.planet_model = new planetModel (planetData);

      this.add_planet_function = new addPlanet( { "model" : this.planet_model} );
      this.planet_surface_area_sim = new planetSurfaceArea( { "model": this.planet_model } );
      this.planet_volume_sim = new planetVolume( { "model": this.planet_model } );
      this.planet_mass_sim = new planetMass( { "model" : this.planet_model } );
      this.planet_diameter_sim = new planetDiameter( { "model" : this.planet_model } );


});
