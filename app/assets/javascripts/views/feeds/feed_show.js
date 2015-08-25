Breedly.Views.FeedShow = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.model, 'change:subscribed', this.render);
  },

  template: JST['feeds/feed_show'],

  events: {
    'click .toggle-subscribe-btn': 'toggleSubscribe',
    'click .delete-btn': 'destroyFeed'
  },

  destroyFeed: function(e) {
    e.preventDefault();
    this.model.destroy();
    Backbone.history.navigate('/', { trigger: true });
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