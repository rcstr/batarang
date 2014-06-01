AcornsTest.ApplicationController = Ember.ObjectController.extend({
  content: {},

  actions: {
    search: function() {
      "use strict";

      var s = this.get('s');

      this.transitionToRoute('stocks.search', { symbol: s } );
    }.observes("s")
  }
});