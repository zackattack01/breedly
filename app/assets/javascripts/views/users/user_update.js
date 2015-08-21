Breedly.Views.UserUpdate = Backbone.ModalView.extend({
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
        resp['responseJSON'].forEach(function(error) {
            that.$('.errors').append('<p>-' + error + '</p>');
          });
        that.rootView.endWhirly();
      }
    });   
  },

  addFeed: function(e) {
    e.preventDefault();
    var feedUrl = $('#feed-url').serializeJSON();
    var newFeed = new Breedly.Models.Feed(feedUrl);
    var that = this;
    this.whirl();
    newFeed.save({}, {
      success: function() {
        that.remove();
        that.rootView.endWhirly();
        that.rootView.addMessage(newFeed.get('title') + " has been added to your personal feeds.", "success");
      },

      error: function(obj, resp) {
        for(var errorType in resp['responseJSON']) {
          that.$('.errors').html('<li>' + resp['responseJSON'][errorType] + '</li>');
        };
        $('#feed-url').val("");
        $('#feed-url').focus();
        that.endWhirly();
      }, 
    });
  }

  // render: function() {
  //   var content = this.template({ model: this.model, collection: this.collection });
  //   this.$el.html(content);
  //   return this;
  // }
});