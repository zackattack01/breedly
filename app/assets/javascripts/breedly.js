window.Breedly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var feeds = new Breedly.Collections.Feeds();
    feeds.fetch();
    //var feedIndex = new Breedly.Views.FeedIndex({ collection: feeds });
    var $el = $('#main-content');
    new Breedly.Routers.Router({ $rootEl: $el, feeds: feeds });
    Backbone.history.start();
  }
};