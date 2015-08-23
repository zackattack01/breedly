Breedly.Views.FeedSearch = Backbone.ModalView.extend({
  initialize: function(options) {
    Backbone.ModalView.prototype.initialize.call(this, "symphony");
  },
  
  template: JST['feeds/feed_search'],

  events: {
    'click button.find-topic-feeds': 'searchForFeed'
  },

  searchForFeed: function(e) {
    e.preventDefault();
    var scope = $(e.currentTarget).data('scope');
    if (scope === "title") {
      var feedTitle = this.$('#feed-title').val();
      this.searchByTitle(feedTitle);
    } else if (scope === "topic") {
      var topic = this.$('#feed-topic').val();
      this.searchByTopic(topic);   
    }
  },

  searchByTopic: function(topic) {
    var topic_feeds = new Breedly.Collections.Feeds();
    this.whirl();
    var that = this;
    topic_feeds.fetch({
      data: { query: 'topic=' + topic },
      success: function(obj, resp) {
        var searchResult = new Breedly.Views.SearchResults({ collection: topic_feeds, rootView: that });
        that.$('.errors').empty();
        var included = false;
        //todo remove 
        that.addSubview('.search-result-content', searchResult);
        that.$('#feed-topic').val("");
        that.endWhirly();
      },

      error: function(obj, resp) {
        that.$('.errors').html('<li>There are currently no feeds with that topic.</li>');
        that.$('#feed-topic').val("");
        that.endWhirly();
      }
    });
  },

  onRender: function() {
    this.delegateEvents();
    Backbone.ModalView.prototype.onRender.call(this);
  }
});