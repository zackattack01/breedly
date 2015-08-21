Breedly.Views.Whirly = Backbone.View.extend({
  template: JST['whirly'],
  className: 'whirly-loader',

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});