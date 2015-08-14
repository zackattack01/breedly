Breedly.Views.RootView = Backbone.CompositeView.extend({
  template: JST['root'],

  events: {
    'click button#update-user-button': 'redirectToUpdate'
  },

  initialize: function(options) {
    this.addFeedsIndexBar();
    this.addNavBar();
    this.listenTo(this.collection, 'sync add', this.render);
  },

  addNavBar: function() {
    var navBar = new Breedly.Views.NavBar();
    this.addSubview('#navbar', navBar);
  },

  addFeedsIndexBar: function(feeds) {
    var feedsIndex = new Breedly.Views.FeedsIndex({ collection: this.collection });
    this.addSubview('#feeds-index', feedsIndex);
  },

  showFeedContent: function(activeFeedId) {
    var activeFeed = new Breedly.Models.Feed({ id: activeFeedId });
    var that = this;
    if (this._activeFeedView) { 
      this._activeFeedView.remove();
      this.removeSubview("#main-content", this._activeFeedView);
    }
    activeFeed.fetch({
      success: function() {
        that._activeFeedView = new Breedly.Views.FeedShow({ model: activeFeed });
        that.addSubview('#main-content', that._activeFeedView);  
      }
    });
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});