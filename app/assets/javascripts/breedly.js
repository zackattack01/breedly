window.Breedly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    var feeds = new Breedly.Collections.Feeds();
    feeds.fetch();
    //var feedIndex = new Breedly.Views.FeedIndex({ collection: feeds });
    var $el = $('#main-content');
    var current_user_id = options['current_user_id'];
    new Breedly.Routers.Router({ 
      $rootEl: $el, 
      feeds: feeds, 
      current_user_id: current_user_id 
    });
    Backbone.history.start();
  }
};