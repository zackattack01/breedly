Breedly.Views.FeedsIndex = Backbone.CompositeView.extend({
  template: JST['feeds/feeds_index'],

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addFeedIndexItemView);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'remove', this.removeFeedItemView);
    var that = this;
    this.collection.fetch({
      success: function() {
        that.collection.each(function(feed) {
          that.addFeedIndexItemView(feed);
        });
      }
    });
  },

  addFeedIndexItemView: function(feed) {
    var feedItem = new Breedly.Views.FeedIndexItem({ model: feed });
    this.addSubview('.feed-list', feedItem);
  },

  removeFeedItemView: function(feed) {
    this.removeModelSubview('.feed-list', feed);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});