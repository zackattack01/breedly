window.Breedly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $el = $('#all-content');
    new Breedly.Routers.Router({ $rootEl: $el });
    Backbone.history.start();
  }
};