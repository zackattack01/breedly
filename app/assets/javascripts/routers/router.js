Breedly.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.feeds = options.feeds;
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'userShow',
    'feeds/:id': 'feedShow'
  },

  userShow: function() {

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