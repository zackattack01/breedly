Breedly.Views.FeedSearch = Backbone.ModalView.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    this.enteredTopics = [];  
    Backbone.ModalView.prototype.initialize.call(this, "symphony");
  },
  
  template: JST['feeds/feed_search'],

  events: {
    'click button.find-topic-feeds': 'searchByTopic',
    'click button.clear-selected-topics': 'clearSelectedTopics',
    'click .search-result-link': 'remove'
  },

  clearSelectedTopics: function(e) {
    e.preventDefault();
    this.enteredTopics = [];
    this.$('.search-result-content').empty();
  },

  searchByTopic: function(e) {
    e.preventDefault();
    var topic_feeds = new Breedly.Collections.Feeds();
    var topic = this.$('#feed-topic').val();
    this.enteredTopics.push(topic);
    this.whirl();
    var that = this;
    topic_feeds.fetch({
      data: { query: 'topics=' + JSON.stringify(that.enteredTopics) },
      success: function(obj, resp) {
        var searchResults = new Breedly.Views.SearchResults({ 
          collection: topic_feeds, rootView: that.rootView 
        });

        that.$('.errors').empty();
        that.swapResults(searchResults);
        that.$('#feed-topic').val("");
        that.endWhirly();
      },

      error: function(obj, resp) {
        var errorView = new Breedly.Views.Error({
          model: "There are currently no feeds with that topic."
        })
        that.$('.errors').html(errorView.render().$el);

        that.$('#feed-topic').val("");
        that.endWhirly();
      }
    });
  },

  swapResults: function(searchResults) {
    this._currentResults && 
    this.removeSubview('.search-result-content', this._currentResults);
    this.addSubview('.search-result-content', searchResults);
    this._currentResults = searchResults;
  },

  onRender: function() {
    this.delegateEvents();
    Backbone.ModalView.prototype.onRender.call(this);
  }
});