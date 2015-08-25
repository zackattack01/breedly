Breedly.Views.Error = Backbone.View.extend({
  template: JST['error'],

  render: function() {
    var content = this.template({ message: this.model });
    this.$el.html(content);
    return this;
  }
});