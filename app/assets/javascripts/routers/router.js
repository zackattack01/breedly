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
    this._swapView(this.rootView);
  },

  feedShow: function(id) {
    this.rootView.showFeedContent(id);
    
    // ask how to not do this nonsense
    this._swapView(this.rootView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});