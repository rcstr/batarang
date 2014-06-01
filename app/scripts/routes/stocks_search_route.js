AcornsTest.StocksSearchRoute = Ember.Route.extend({
  model: function(params) {
    "use strict";

    var stocks = [],
      self = this;

    Ember.$.getJSON(AcornsTest.Config.quandl.URL+'.json', { query: params.symbol, auth_token: AcornsTest.Config.quandl.APIKEY }).then(function(data) {
      data.docs.forEach(function(doc) {
        stocks.pushObject(self.store.createRecord('stock', {
          source_code: doc.source_code,
          code: doc.code,
          name: doc.name,
          description: doc.description,
          display_url: doc.display_url,
          source_name: doc.source_name
        }));
      });
    });

    return stocks;
  }
});