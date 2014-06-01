/*global Ember*/
AcornsTest.Stock = DS.Model.extend({
  source_code: DS.attr('string'),
  code: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  display_url: DS.attr('string')
});