define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetModel'

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
      this.cube();
    },

    activate_volume_sim: function() {
      $("#volume").click(function(){
        $("#planet_volume").show();
        $("#planet_surface_area").hide();
        $("#planet_mass").hide();
        $("#planet_diameter").hide();

      });
    },

    cube: function() {
      console.log("cube");
    }

  });

  return planetView;

});
