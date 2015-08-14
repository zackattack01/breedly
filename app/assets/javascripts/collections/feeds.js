Breedly.Collections.Feeds = Backbone.Collection.extend({
  url: 'api/feeds',
  model: Breedly.Models.Feed,

  getOrFetch: function(id) {
    var feeds = this;
    var feed = this.get(id);
    if (feed) {
      feed.fetch();
    } else {
      feed = new Breedly.Models.Feed({ id: id });
      feeds.add(feed);
      feed.fetch({
        error: function() {
          feeds.remove(feed);
        }
      });
    }
    return feed;
  }
});