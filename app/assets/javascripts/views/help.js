Breedly.Views.Help = Backbone.View.extend({
  template: JST['help'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});