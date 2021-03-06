Breedly.Views.RootView = Backbone.CompositeView.extend({
  template: JST['root'],

  initialize: function(options) {
    this.subscriptions = new Breedly.Collections.Feeds();
    this.addFeedsIndexBar();
    this.addNavBar();
    this.rendered = false;
    this.whirlyView = new Breedly.Views.Whirly();
  },

  addNavBar: function() {
    var navBar = new Breedly.Views.NavBar({ rootView: this, $el: this.$('#navbar') });
    this.addSubview('#navbar', navBar);
  },

  whirl: function() {
    this.addSubview('.whirly', this.whirlyView);
  },

  endWhirly: function() {
    this.removeSubview('.whirly', this.whirlyView);
  },

  refreshSubscribedFeeds: function() {
    this.subviews('#feeds-index')._wrapped[0].refreshSubscribedFeeds();
  },

  addFeedsIndexBar: function(feeds) {
    var feedsIndex = new Breedly.Views.FeedsIndex({ 
      collection: this.subscriptions, rootView: this, $el: this.$('#feeds-index') 
    });
    this.addSubview('#feeds-index', feedsIndex);
  },

  showFeedContent: function(activeFeedId) {
    if (activeFeedId === "help") {
      var helpView = new Breedly.Views.Help();
      this.swapActiveFeed(helpView);
    } else if (activeFeedId === "splash") {
      var splashPage = new Breedly.Views.Splash();
      this.swapActiveFeed(splashPage);
    } else {
      this._activeFeed = new Breedly.Models.Feed({ id: activeFeedId });
      this.whirl();
      var that = this;
      this._activeFeed.fetch({
        success: function() {
          var entriesView = new Breedly.Views.EntriesIndex({ 
            model: that._activeFeed, rootView: that, $el: that.$('#entries-index') 
          });
          that.swapActiveEntries(entriesView);
          activeFeedView = new Breedly.Views.FeedShow({ 
            model: that._activeFeed, rootView: that 
          });   
          that.swapActiveFeed(activeFeedView);
          that.endWhirly();
        },

        error: function() {
          that.endWhirly();
          that.addMessage(
            "We're sorry, we were unable to retrieve your feed at this time.", 
            "error"
          );
          Backbone.history.navigate('/', { trigger: true });
        }
      }); 
    }
  },

  addMessage: function(message, status) {
    var selector;
    var messageView;
    if (status === "error") {
      selector = "#errors-main";
      messageView = new Breedly.Views.Error({ model: message });
    } else {
      selector = "#success-main";
      messageView = new Breedly.Views.Success({ model: message });
    } 
    this.$(selector).html(messageView.render().$el);
    setTimeout(function() {
      this.dumpMessages();
    }.bind(this), 3000);
  },

  dumpMessages: function() {
    this.$("#success-main").empty();
    this.$("#errors-main").empty();
  },

  swapTeaser: function(view) {
    this._teaser && this._teaser.remove();
    this._teaser = view;
    this.$('#main-container').append(view.render().$el);
  },

  killTeaser: function() {
    this._teaser && this._teaser.remove();
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