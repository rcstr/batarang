AcornsTest.StockController = Ember.ObjectController.extend({
  init: function() {
    "use strict";
    this._super();

    this.send('generateChartInfo');
  },

  actions: {
    generateChartInfo: function() {
      "use strict";

      console.log(this.model);
      console.log(this.get('model'));
    }
  }
});

