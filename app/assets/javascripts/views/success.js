Breedly.Views.Success = Backbone.View.extend({
  template: JST['success'],

  render: function() {
    var content = this.template({ message: this.model });
    this.$el.html(content);
    return this;
  }
});