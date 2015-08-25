Backbone.ModalView = Backbone.CompositeView.extend({
  initialize: function(bg) {
    this.whirlyView = new Breedly.Views.Whirly();
    this.templateStart = '<div class="modal-bg"></div><div class="modal-content ' + 
                          bg + '"><button class="close">&times;</button>' +
                          '<div class="errors"></div>' +
                          '<div class="whirly"></div>'
                          
    this.templateFin = '</div>'
  },

  handleEscape: function(e) {
    if (e.keyCode === 27) { this.remove(); }
  },

  whirl: function() {
    this.addSubview('.whirly', this.whirlyView);
  },

  endWhirly: function() {
    this.removeSubview('.whirly', this.whirlyView);
  },

  onRender: function() {
    $(document).on('keyup', this.handleEscape.bind(this));
    this.$('.close').on('click', this.remove.bind(this));
    this.$('.modal-bg').on('click', this.remove.bind(this));
  },

  render: function() {
    var content = this.templateStart + 
                  this.template({ model: this.model, collection: this.collection }) + 
                  this.templateFin;
    this.$el.html(content);
    this.onRender();
    return this;
  }
});