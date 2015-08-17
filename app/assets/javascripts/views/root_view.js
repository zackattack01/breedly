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

  addFeedsIndexBar: function(feeds) {
    var feedsIndex = new Breedly.Views.FeedsIndex({ collection: this.collection, rootView: this });
    this.addSubview('#feeds-index', feedsIndex);
  },

  showFeedContent: function(activeFeedId) {
    this._activeFeed = new Breedly.Models.Feed({ id: activeFeedId });

    var that = this;
    //clean this shit up 
    this._activeFeed.fetch({
      success: function() {
        var entriesView = new Breedly.Views.EntriesIndex({ model: that._activeFeed, rootView: that });
        that.swapActiveEntries(entriesView);
        activeFeedView = new Breedly.Views.FeedShow({ model: that._activeFeed });   
        that.swapActiveFeed(activeFeedView);
      }
    }); 
  },

  showFeedDescription: function(feedDescView) {
    this._hoveredFeedDesc = feedDescView;
    this.$('#main-overlay').append(feedDescView.render().$el);
  },

  removeFeedDescription: function() {
    this._hoveredFeedDesc && this._hoveredFeedDesc.remove();
  },

  // affixDescription: function(descView) {
  //   this._activeDescView && this._activeDescView.remove();
  //   this._activeDescView = descView;
  // },  

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