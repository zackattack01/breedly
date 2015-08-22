Breedly.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.feeds = new Breedly.Collections.Feeds();
    this.$rootEl = options.$rootEl;
    this.rootView = new Breedly.Views.RootView({ collection: this.feeds }); 
  },

  routes: {
    '': 'userRoot',
    'feeds/:id': 'feedShow'
  },

  userRoot: function() {
    this.$rootEl.html(this.rootView.$el);
    this.rootView.render();
  },

  feedShow: function(id) {
    if (!this.rootView.rendered) {
      this.$rootEl.html(this.rootView.$el);
      this.rootView.render();
    };
    this.rootView.showFeedContent(id);
  }
});