Breedly.Views.RootView = Backbone.CompositeView.extend({
  template: JST['root'],

  events: {
    'click button#update-user-button': 'redirectToUpdate'
  },

  initialize: function(options) {
    this.feeds = options.feeds;
    this.addFeedsIndexBar(options.feeds);
    this.addNavBar();
  },

  addNavBar: function() {
    var navBar = new Breedly.Views.NavBar();
    this.addSubview('#navbar', navBar);
  },

  addFeedsIndexBar: function(feeds) {
    var feedsIndex = new Breedly.Views.FeedsIndex({ collection: feeds });
    this.addSubview('#feeds-index', feedsIndex);
  },

  showFeedContent: function(activeFeedId) {
    var activeFeed = this.feeds.getOrFetch(activeFeedId);
    this._activeFeedView && this._activeFeedView.remove();
    this._activeFeedView = new Breedly.Views.FeedShow({ model: activeFeed });
    this.addSubview('#main-content', this._activeFeedView);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});