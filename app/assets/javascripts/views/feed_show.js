Breedly.Views.FeedShow = Backbone.View.extend({
  template: JST['feeds/feed_show'],

  events: {
    'click #add-this-feed-btn': 'subscribeToFeed'
  },

  subscribeToFeed: function() {
    
  },

  initialize: function(options) {
    this.listenTo(this.model, 'sync change', this.render);
  },

  render: function() {
    var content = this.template({ feed: this.model });  
    this.$el.html(content);
    return this;
  }
});