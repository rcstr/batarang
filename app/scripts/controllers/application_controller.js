AcornsTest.ApplicationController = Ember.ObjectController.extend({
  content: {},

  actions: {
    search: function(s) {
      "use strict";

      this.transitionToRoute('stocks.search', s);
    }
  }
});