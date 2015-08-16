Breedly.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.feeds = new Breedly.Collections.Feeds();
    this.$rootEl = options.$rootEl;
    this.rootView = new Breedly.Views.RootView({ collection: this.feeds, $el: options.$rootEl }); 
  },

  routes: {
    '': 'userRoot',
    'feeds/:id': 'feedShow'
  },

  userRoot: function() {
    this.$rootEl.html(this.rootView.render().$el);
  },

  feedShow: function(id) {
    if (!this.rootView.rendered) {
      this.$rootEl.html(this.rootView.render().$el);
    };
    this.rootView.showFeedContent(id);
  }
});