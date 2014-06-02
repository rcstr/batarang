  AcornsTest.StockController = Ember.ObjectController.extend({
  init: function() {
    "use strict";

    this.set('chartInfo', 'Dennis');

    return this._super();
  },

  actions: {
    generateChartInfo: function() {
      "use strict";

      this.set('chartInfo', 'Castro');
      console.log(this.get('model').get('data'));
    }
  }
});

