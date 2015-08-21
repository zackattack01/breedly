Backbone.ModalView = Backbone.CompositeView.extend({
  initialize: function(options) {
    $(document).on('keyup', this.handleEscape.bind(this));
    this.whirlyView = new Breedly.Views.Whirly();
    this.templateStart = '<div class="modal-bg"></div><div class="modal-content ' + 
                            options.bg + '"><div class="errors"><ul></ul></div>' +
                            '<button class="close">&times;</button>'
    this.templateFin = '</div>'
    this.postInitialize && this.postInitialize(options);
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
    var content = this.templateStart + this.template() + this.templateFin;
    this.$el.html(content);
    return this;
  }
});