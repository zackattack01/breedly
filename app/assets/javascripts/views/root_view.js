Breedly.Views.RootView = Backbone.CompositeView.extend({
  template: JST['root'],

  events: {
    'click button#update-user-button': 'redirectToUpdate'
  },

  initialize: function(options) {
    //feeds bar
    this.addFeedsIndexBar(options.feeds);
    //nav
    //main
    // this.addMainContent();
  },

  addNavBar: function() {

  },

  addFeedsIndexBar: function(feeds) {
    var feedsIndex = new Breedly.Views.FeedsIndex({ collection: feeds });
    this.addSubview('#feeds-index', feedsIndex);
  },

  showFeedContent: function(activeFeed) {
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