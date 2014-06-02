AcornsTest.StocksSearchRoute = Ember.Route.extend({
  model: function(params) {
    "use strict";

    var url = AcornsTest.Config.quandl.URL + '.json',
      stocks = [],
      self = this;

    Ember.$.getJSON(url, { query: params.symbol, auth_token: AcornsTest.Config.quandl.APIKEY })
      .then(function(data) {
      data.docs.forEach(function(doc) {
        var stockInStore = self.store.getById('stock', doc.code);

        if(stockInStore) {
          stocks.pushObject(stockInStore);
        } else {
          stocks.pushObject(self.store.createRecord('stock', {
            id: doc.code,
            source_code: doc.source_code,
            code: doc.code,
            name: doc.name,
            description: doc.description,
            display_url: doc.display_url,
            source_name: doc.source_name,
            slug: doc.source_code+'|'+doc.code
          }));
        }
      });
    });

    return stocks;
  }
});