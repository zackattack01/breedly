Breedly.Models.FeedTopics = Backbone.Model.extend({
  urlRoot: 'api/feed_topics',
  
  initialize: function(options) {
    this.feed = options.feed;
  }
});