Breedly.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.feeds = new Breedly.Collections.Feeds();
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'userRoot',
    'feeds/:id': 'feedShow',
    'users/:id/edit': 'userUpdate'
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

  userUpdate: function(id) {
    var user = new Breedly.Models.User();
    user.set(Breedly.CURRENT_USER); 
    var view = new Breedly.Views.UserUpdate({ model: user });
    this._swapView(view);
  },

  feedShow: function(id) {
    var activeFeed = this.feeds.getOrFetch(id);
    this.rootView().showFeedContent(activeFeed);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});