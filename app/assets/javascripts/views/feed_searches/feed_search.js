Breedly.Views.FeedSearch = Backbone.ModalView.extend({
  template: JST['feeds/feed_search'],

  events: {
    'click button.find-titled-feed': 'searchForFeed',
    'click button.find-topic-feeds': 'searchForFeed',
    'click .close, .modal-background, .search-result-link': 'remove'
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
    var that = this;
    this.whirl();
    topic_feeds.fetch({
      data: { query: 'topic=' + topic },
      success: function(obj, resp) {
        var searchResult = new Breedly.Views.SearchResults({ collection: topic_feeds, rootView: that });
        var included = false;
        // that.eachSubview(function(subview) {
        //   if (subview.model.get()) {};
          
        // });
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

  searchByTitle: function(title) {
    var newFeed = this.collection.where({ title: title })[0];
    if (typeof newFeed === "undefined") {
      this.$('#feed-title').val("")
      this.$('.errors').html('<li>There are currently no feeds with that title.</li>')
    } else {
      this.remove();
      Backbone.history.navigate('feeds/' + newFeed.id, { trigger: true });  
    }
  },

  onRender: function() {
    this.delegateEvents();
  }
});