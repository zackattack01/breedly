Breedly.Views.RootView = Backbone.CompositeView.extend({
  template: JST['root'],

  initialize: function(options) {
    this.subscriptions = new Breedly.Collections.Feeds();
    this.addFeedsIndexBar();
    this.addNavBar();
    this.rendered = false;
  },

  addNavBar: function() {
    var navBar = new Breedly.Views.NavBar({ rootView: this });
    this.addSubview('#navbar', navBar);
  },

  whirl: function() {
    this.$('#whirly').html('<div class="whirly-loader"></div>');
  },

  endWhirly: function() {
    this.$('#whirly').empty();
  },

  refreshSubscribedFeeds: function() {
    this.subscriptions.fetch({
      data: { query: "subscribed" }
    });
  },

  addFeedsIndexBar: function(feeds) {
    var feedsIndex = new Breedly.Views.FeedsIndex({ collection: this.subscriptions, rootView: this });
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
        activeFeedView = new Breedly.Views.FeedShow({ model: that._activeFeed, rootView: that });   
        that.swapActiveFeed(activeFeedView);
        that.endWhirly();
      },

      error: function() {
        that.endWhirly();
        that.addMessage("We're sorry, we were unable to retrieve your feed at this time.", "error");
        Backbone.history.navigate('/', { trigger: true });
      }
    }); 
  },

  addMessage: function(message, status) {
    var selector = (status === "error" ? "#errors-main" : "#success-main");
    this.$(selector).html('<p>' + message + '</p>');
    setTimeout(function() {
      this.dumpMessages();
    }.bind(this), 3000);
  },

  dumpMessages: function() {
    this.$("#success-main").empty();
    this.$("#errors-main").empty();
  },

  showFeedDescription: function(feedDescView) {
    this._hoveredFeedDesc = feedDescView;
    this.$('#main-container').append(feedDescView.render().$el);
  },

  removeFeedDescription: function() {
    this._hoveredFeedDesc && this._hoveredFeedDesc.remove();
  },

  swapActiveFeed: function(activeFeedView) {
    this._activeFeedView && this._activeFeedView.remove();
    this._activeFeedView = activeFeedView;
    this.$('#main-content').html(activeFeedView.$el);
    activeFeedView.render();
  },

  swapActiveEntries: function(activeEntriesView) {
    this._activeEntriesIndex && this._activeEntriesIndex.remove();
    this._activeEntriesIndex = activeEntriesView;
    this.$('#entries-index').html(activeEntriesView.$el);
    activeEntriesView.render();
  },

  render: function() {
    this.rendered = true;
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  }
});