Breedly.Views.FeedSearch = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    $(document).on('keyup', this.handleEscape.bind(this));
  },

  template: JST['feeds/feed_search'],

  events: {
    'click button.find-titled-feed': 'searchForFeed',
    'click .close': 'remove',
    'click .modal-background': 'remove'
  },

  searchForFeed: function(e) {
    e.preventDefault();
    var feedTitle = this.$('#feed-title').val();
    var newFeed = this.collection.where({ title: feedTitle })[0];
    var that = this;
    if (typeof newFeed === "undefined") {
      this.$('#feed-title').val("")
      this.$('.errors').html('<p>-There are currently no feeds with that title.</p>')
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