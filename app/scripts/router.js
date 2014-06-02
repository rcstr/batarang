AcornsTest.Router.map(function () {
  "use strict";

  this.resource('stocks', function(){
    this.route('search', { path: '/search/:symbol' });
    this.resource('stock', { path: '/:slug' });
  });
  
});
