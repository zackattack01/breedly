Breedly.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.feeds = options.feeds;
    this.$rootEl = options.$rootEl;
    this.current_user = options.current_user;
  },

  routes: {
    '': 'userRoot',
    'feeds/:id': 'feedShow',
    'users/:id/edit': 'userUpdate'
  },

  userRoot: function() {
    console.log("IN USER SHOW");
    this.$rootEl.html('<h1>IN SHOW</h1>')    
  },

  userUpdate: function() {
    var 
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
  
//    
//Backbone.history.navigate('users/' + this.current_user_id, { trigger: true });