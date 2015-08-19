Breedly.Collections.Subscriptions = Backbone.Collection.extend({
  url: 'api/subscriptions',

  model: Breedly.Models.Subscription
});