Breedly.Views.FeedsIndex = Backbone.CompositeView.extend({
  template: JST['feeds/feeds_index'],

  initialize: function(options) {
    this.rootView = options.rootView;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addFeedIndexItemView);
    this.listenTo(this.collection, 'remove', this.removeFeedItemView);
    this.collection.fetch({
      data: { query: "subscribed" }
    });
    this.collection.each(function(feed) {
      that.addFeedIndexItemView(feed);
    });
  },

  addFeedIndexItemView: function(feed) {
    var feedItem = new Breedly.Views.FeedIndexItem({ model: feed, rootView: this.rootView });
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