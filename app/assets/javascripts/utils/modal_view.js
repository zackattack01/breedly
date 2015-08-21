Backbone.ModalView = Backbone.View.extend({
  handleEscape: function(e) {
    if (e.keyCode === 27) {
      this.remove();
    }
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});