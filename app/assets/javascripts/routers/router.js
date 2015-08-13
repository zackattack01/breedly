Breedly.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.feeds = options.feeds;
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'userRoot',
    'feeds/:id': 'feedShow',
    'users/:id/edit': 'userUpdate'
  },

  userRoot: function() {
    var user = this.currentUser;
    var view = new Breedly.Views.RootView({ model: user });
    this._swapView(view); 
  },

  userUpdate: function(id) {
    var user = new Breedly.Models.User();
    user.set(Breedly.CURRENT_USER); 
    var view = new Breedly.Views.UserUpdate({ model: user });
    this._swapView(view);
  },

  feedShow: function(id) {
    var feed = this.feeds.getOrFetch(id);
    var view = new Breedly.Views.Feeds({ model: feed });
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});