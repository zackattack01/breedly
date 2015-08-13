window.Breedly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    var $el = $('#all-content');
    new Breedly.Routers.Router({ $rootEl: $el });
    Backbone.history.start();
  }
};