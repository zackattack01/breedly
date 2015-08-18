Breedly.Views.RootView = Backbone.CompositeView.extend({
  template: JST['root'],

  initialize: function(options) {
    this.addFeedsIndexBar();
    this.addNavBar();
    this.rendered = false;
  },

  addNavBar: function() {
    var navBar = new Breedly.Views.NavBar();
    this.addSubview('#navbar', navBar);
  },

  whirl: function() {
    this.$('#errors-and-whirly').html('<div class="whirly-loader"></div>');
  },

  addFeedsIndexBar: function(feeds) {
    var feedsIndex = new Breedly.Views.FeedsIndex({ collection: this.collection, rootView: this });
    this.addSubview('#feeds-index', feedsIndex);
  },

  showFeedContent: function(activeFeedId) {
    this._activeFeed = new Breedly.Models.Feed({ id: activeFeedId });
    this.whirl();
    var that = this;
    this._activeFeed.fetch({
      success: function() {
        var entriesView = new Breedly.Views.EntriesIndex({ model: that._activeFeed, rootView: that });
        that.swapActiveEntries(entriesView);
        activeFeedView = new Breedly.Views.FeedShow({ model: that._activeFeed });   
        that.swapActiveFeed(activeFeedView);
        that.$('#errors-and-whirly').empty();
      }
    }); 
  },

  showFeedDescription: function(feedDescView) {
    this._hoveredFeedDesc = feedDescView;
    this.$('#main-content').append(feedDescView.render().$el);
  },

  removeFeedDescription: function() {
    this._hoveredFeedDesc && this._hoveredFeedDesc.remove();
  },

  swapActiveFeed: function(activeFeedView) {
    this._activeFeedView && this._activeFeedView.remove();
    this._activeFeedView = activeFeedView;
    this.$('#main-content').html(activeFeedView.render().$el);
  },

  swapActiveEntries: function(activeEntriesView) {
    this._activeEntriesIndex && this._activeEntriesIndex.remove();
    this._activeEntriesIndex = activeEntriesView;
    this.$('#entries-index').html(activeEntriesView.render().$el);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.rendered = true;
    return this;
  }
});