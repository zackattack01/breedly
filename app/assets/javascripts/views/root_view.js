Breedly.Views.RootView = Backbone.CompositeView.extend({
  template: JST['root'],

  events: {
    'click button#update-user-button': 'redirectToUpdate'
  },

  initialize: function(options) {
    this.feeds = options.feeds;
    //feeds sidebar
    this.addFeedsIndexBar(options.feeds);
    //remember nav
  },

  addNavBar: function() {

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

  redirectToUpdate: function(e) {
    e.preventDefault();
    Backbone.history.navigate('users/' + Breedly.CURRENT_USER['id'] + '/edit', { trigger: true });
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});