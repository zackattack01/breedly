Breedly.Models.Feed = Backbone.Model.extend({
  urlRoot: 'api/feeds',

  parse: function(response) {
    if (response.entries) {
      this.entries = response.entries;
      delete response.entries;
    }
    return response;
  }
}); 