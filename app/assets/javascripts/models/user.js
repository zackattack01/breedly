Breedly.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  initialize: function(current_user) {
    this.userData = current_user;
  }

});