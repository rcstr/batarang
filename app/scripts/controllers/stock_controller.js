  AcornsTest.StockController = Ember.ObjectController.extend({
    init: function() {
      "use strict";

      return this._super();
    },

    timeframeOptions: function() {
      "use strict";
      return [
        {name: "1 Month", value: '1|m'},
        {name: "3 Months", value: '3|m'},
        {name: "6 Months", value: '6|m'},
        {name: "1 Year", value: '1|y'}
      ];
    }.property(),

    timeframeSelected: null,

    chartInfo: {
        x: 'x',
        columns: [
          ['x'],
          ['']
        ]
    },

    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d'
        }
      }
    },

    timeframeObserver: function() {
      "use strict";

      var value = this.get('timeframeSelected').value,
        chartData = this.get('model').get('data'),
        chartInfo = this._generateChartInfo(value, chartData);

      this.set('chartInfo', chartInfo);
    }.observes('timeframeSelected'),

    _generateChartInfo: function(timeframe, info) {
      "use strict";

      timeframe = getTimeframeDate(timeframe);
      var stockName = this.get('model').get('name');


      // helpers
      function getTimeframeDate(timeframe) {
        "use strict";

        // m = month
        // y = year

        var values = timeframe.split('|'),
          qty = values[0],
          metric = values[1],
          currentDate = new Date();

        if(metric === 'm') {
          currentDate.setMonth(currentDate.getMonth() - qty);
        }

        if(metric === 'y') {
          currentDate.setYear(currentDate.getFullYear() - qty);
        }

        return currentDate;
      }

      return (function() {
        var x = ['x'],
          column1 = [stockName];

        Ember.$.each(info, function(index, value) {
          // first let's check that the date is in the range we want
          var stockPriceDate = new Date(value[0]);
          if(timeframe < stockPriceDate) {
            x.push(value[0]);
            column1.push(value[1]);
          }
        });

        return {
          x: 'x',
          columns: [x, column1]
        };
      })();

    }
});

