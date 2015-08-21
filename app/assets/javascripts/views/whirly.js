Breedly.Views.Whirly = Backbone.View.extend({
  template: JST['whirly'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});