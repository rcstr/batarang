AcornsTest.StockRoute = Ember.Route.extend({
  model: function(params) {
    "use strict";
    var url_params = params.slug.split('|'),
      url = AcornsTest.Config.quandl.URL + '/' + url_params[0] + '/' + url_params[1] + '.json',
      stockInStore = this.store.getById('stock', url_params[1]),
      today =  new Date(),
      yearAgo = new Date(),
      self = this;

    yearAgo.setFullYear(today.getFullYear() - 1);
    today = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();
    yearAgo = yearAgo.getFullYear()+'-'+yearAgo.getMonth()+'-'+yearAgo.getDate();

    if(stockInStore && stockInStore.get('data').length) {
      return stockInStore;
    }

    return Ember.$.getJSON(url,{ trim_start: yearAgo, trim_end: today, auth_token: AcornsTest.Config.quandl.APIKEY })
      .then(function(data) {
        if(stockInStore) {
           return stockInStore.set('data', data.data);
        } else {
           return self.store.createRecord('stock', {
            id: data.code,
            source_code: data.source_code,
            code: data.code,
            name: data.name,
            description: data.description,
            display_url: data.display_url,
            source_name: data.source_name,
            data: data.data,
            slug: data.source_code+'|'+data.code
          });
        }
    });
  },

  setupController: function(controller, model) {
    "use strict";
    controller.set('set', model);
  }
});

