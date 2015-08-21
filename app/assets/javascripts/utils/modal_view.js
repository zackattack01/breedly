Backbone.ModalView = Backbone.CompositeView.extend({
  initialize: function(options) {
    $(document).on('keyup', this.handleEscape.bind(this));
    this.whirlyView = new Breedly.Views.Whirly();
  },

  handleEscape: function(e) {
    if (e.keyCode === 27) {
      this.remove();
    }
  },

  whirl: function() {
    this.addSubview('.whirly', this.whirlyView);
  },

  endWhirly: function() {
    this.removeSubview('.whirly', this.whirlyView);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});