Breedly.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users'

  // parse: function(response) {
  //   if (response.subscriptions) {
  //     this.subscriptions().add(response.subscriptions);
  //     delete response.subscriptions;
  //   };
  //   return response;
  // }

  // subscribed: function() {

  // },

  // subscriptions: function() {
  //   if (!this._subscriptions) {
  //     this._subscriptions = new Breedly.Collections.Subscriptions();
  //   }
  //   return this._subscriptions;
  // }
});