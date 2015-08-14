Breedly.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.feeds = new Breedly.Collections.Feeds();
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'userRoot',
    'feeds/:id': 'feedShow'
  },

  userRoot: function() {
    this._swapView(this.rootView()); 
  },

  rootView: function() {
    if (!this._rootView) {
      this._rootView = new Breedly.Views.RootView({ feeds: this.feeds });
    }
    return this._rootView;
  },

  feedShow: function(id) {
    this.rootView().showFeedContent(id);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});