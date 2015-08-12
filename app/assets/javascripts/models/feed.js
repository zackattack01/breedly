Breedly.Models.Feed = Backbone.Model.extend({
  urlRoot: 'api/feeds',

  feeds: function() {
    if (!this._feeds) {
      this._feeds = new Breedly.Collections.Feeds();
    }
    return this._feeds;
  }
}); 