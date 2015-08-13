Breedly.Models.Feed = Backbone.Model.extend({
  urlRoot: 'api/feeds',

  parse: function(response) {
    if (response.entries) {
      this._entries = response.entries;
      delete response.entries;
    }
    return response;
  },

  entries: function() {
    if (!this._entries) {
      this._entries = [];
    }
    return this._entries;
  }
}); 