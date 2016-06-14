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
    'js/models/planetappM',
    'js/views/planetMass',
    'js/views/planetDiameter'
],function($, d3, planetModel, planetMass, planetDiameter) {

        var planetData =  {
                           "name":["Mercury","Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"],
                           "mass":[0.330,	4.87, 5.97,	0.642, 1898,	568, 86.8,	102,	0.0146],
                           "diameter":[4879,	12104, 12756,	6792,	142,984,	120,536,	51,118,	49,528,	2370]
                        }

      this.planet_model = new planetModel (planetData);

      var defaults = 0;

      $("#mass").click(function() {
        this.planet_mass_sim = new planetMass( { "model" : this.planet_model } );
      });
      this.planet_diameter_sim = new planetDiameter( { "model" : this.planet_model } );


});
