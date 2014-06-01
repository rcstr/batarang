AcornsTest.StockRoute = Ember.Route.extend({
  model: function(params) {
    "use strict";
    var url = AcornsTest.Config.quandl.URL + '/' + params.source_code + '/' + params.code + '.json',
      self = this,
      stock,
      stockID = params.source_code + params.code,
      stockInStore = this.store.getById('stock', stockID);

    if(stockInStore && stockInStore.get('data').length) {
      return stockInStore;
    }

    Ember.$.getJSON(url,{ auth_token: AcornsTest.Config.quandl.APIKEY })
      .then(function(data) {
        if(stockInStore) {
          stockInStore.set('data', data.data);
          console.log(stockInStore.get('data'));
          stock = stockInStore;
        } else {
          stock = self.store.createRecord('stock', {
            id: stockID,
            source_code: data.source_code,
            code: data.code,
            name: data.name,
            description: data.description,
            display_url: data.display_url,
            source_name: data.source_name,
            data: data.data
          });
        }
    });

    return stock;
  }
});

