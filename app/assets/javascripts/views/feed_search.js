Breedly.Views.FeedSearch = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    $(document).on('keyup', this.handleEscape.bind(this));
  },

  template: JST['feeds/feed_search'],

  events: {
    'click button.find-titled-feed': 'searchForFeed',
    'click button.find-topic-feeds': 'searchForFeed',
    'click .close': 'remove',
    'click .modal-background': 'remove'
  },

  searchForFeed: function(e) {
    e.preventDefault();
    var scope = $(e.currentTarget).data('scope');
    // debugger;
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
    topic_feeds.fetch({
      data: { query: 'topic=' + topic },
      success: function(obj, resp) {
        var searchResult = new Breedly.Views.SearchResults({ collection: topic_feeds });
        that.addSubview('.search-result-content', searchResult);
      },

      error: function(obj, resp) {
        debugger;
      }
    });
  },

  searchByTitle: function(title) {
    var newFeed = this.collection.where({ title: title })[0];
    if (typeof newFeed === "undefined") {
      this.$('#feed-title').val("")
      this.$('.errors').html('<ul><li>There are currently no feeds with that title.</li></ul>')
    } else {
      this.remove();
      Backbone.history.navigate('feeds/' + newFeed.id, { trigger: true });  
    }
  },

  handleEscape: function(e) {
    if (e.keyCode === 27) {
      this.remove();
    }
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});