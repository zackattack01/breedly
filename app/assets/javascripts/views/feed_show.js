Breedly.Views.FeedShow = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.model, 'change:subscribed', this.render)
  },

  template: JST['feeds/feed_show'],

  events: {
    'click .toggle-subscribe-btn': 'toggleSubscribe'
  },

  toggleSubscribe: function(e) {
    e.preventDefault();
    this.model.toggleSubscribe();
    this.rootView.refreshSubscribedFeeds();
  },

  render: function() {
    var content = this.template({ feed: this.model });  
    this.$el.html(content);
    return this;
  }
});