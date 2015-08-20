Breedly.Views.UserUpdate = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    $(document).on('keyup', this.handleEscape.bind(this));
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['users/update'],

  events: {
    'click button#submit-update': 'submitUpdate',
    'click button.add-feed': 'addFeed',
    'click .close': 'remove',
    'click .modal-background': 'remove'
  },

  submitUpdate: function(e) {
    e.preventDefault();
    var userData = $('#user-update').serializeJSON().user;
    delete userData['id'];
    this.model.set(userData);
    var that = this;
    this.rootView.whirl();

    that.model.save({}, {
      success: function() {
        that.remove();
        that.rootView.addMessage("Settings updated!", "success");
        that.rootView.endWhirly();
      },

      error: function(obj, resp) {
        that.rootView.addError(resp.responseJSON[0].slice(5), "error");
        that.rootView.endWhirly();
      }
    });   
  },

  handleEscape: function(e) {
    if (e.keyCode === 27) {
      this.remove();
    }
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});