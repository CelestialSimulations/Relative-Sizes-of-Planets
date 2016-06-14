
define([
    'jquery',
    'jqueryui',
    'd3',
    'backbone',
    'js/models/planetappM'
], function($, $ui, d3, backbone, planetModel) {

  var planetView = backbone.View.extend({

    initialize: function() {

      this.elementScale = "#planet_mass";

      this.width = this.model.get("width");
      this.height = this.model.get("height");

      this.svg = d3.select(this.elementScale).append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

      this.draw_planets();


    },

    draw_planets: function() {

      console.log(this.model.get("name"));

      this.planets = this.svg.selectAll(".graph_planet");
    }


  });

  return planetView;


});
