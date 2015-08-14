Breedly.Views.UserUpdate = Backbone.View.extend({
  initialize: function() {
    $(document).on('keyup', this.handleEscape.bind(this));
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['users/update'],

  events: {
    'click form button.submit': 'submitUpdate',
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
    //ask how to not save id
    that.model.save({}, {
      success: function() {
        that.remove();
      },

      error: function(resp) {
        //do something with response errors
        console.log(resp);
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