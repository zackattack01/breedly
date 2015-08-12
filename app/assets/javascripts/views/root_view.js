Breedly.Views.RootView = Backbone.View.extend({
  template: JST['root'],

  events: {
    'click button#update-user-button': 'redirectToUpdate'
  },

  redirectToUpdate: function(e) {
    e.preventDefault();
    Backbone.history.navigate('users/' + this.model.id + '/edit', { trigger: true });
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});