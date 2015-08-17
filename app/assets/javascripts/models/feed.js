Breedly.Models.Feed = Backbone.Model.extend({
  urlRoot: 'api/feeds',

  initialize: function() {
    this.set('selectedEntryIdx', 0);
  },

  parse: function(response) {
    if (response.entries) {
      this.entries = response.entries;
      delete response.entries;
    }
    return response;
  }
}); 