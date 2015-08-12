Breedly.Views.UserUpdate = Backbone.View.extend({
  template: JST['users/update'],

  events: {
    'click form button.submit': 'update'
  },

  update: function(e) {
    e.preventDefault();
    var userData = $('#user-update').serializeJSON();
    debugger;
    this.model.set(userData);
    var that = this;
    that.model.save({}, {
      success: function() {
        that.model.fetch();
        Backbone.history.navigate('/', { trigger: true });
      }
    });
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});
