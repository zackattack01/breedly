Breedly.Views.UserUpdate = Backbone.ModalView.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    this.listenTo(this.model, 'sync', this.render);
    Backbone.ModalView.prototype.initialize.call(this, "feathered-bg");
  },

  template: JST['users/update'],

  events: {
    'click button#submit-update': 'submitUpdate',
    'click button.add-feed': 'addFeed',
  },

  submitUpdate: function(e) {
    e.preventDefault();
    var userData = $('#user-update').serializeJSON().user;
    delete userData['id'];
    this.model.set(userData);
    var that = this;
    this.whirl();

    that.model.save({}, {
      success: function() {
        that.remove();
        that.rootView.addMessage("Settings updated!", "success");
        that.endWhirly();
      },

      error: function(obj, resp) {
        resp['responseJSON'].forEach(function(error) {
            that.$('.errors').append('<p>-' + error + '</p>');
          });
        that.endWhirly();
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
        that.endWhirly();
        that.rootView.addMessage(newFeed.get('title') + " has been added to your personal feeds.", "success");
      },

      error: function(obj, resp) {
        var errorContent = ""
        for(var errorType in resp['responseJSON']) {
          errorContent += ('<li>' + resp['responseJSON'][errorType] + '</li>');
        };
        that.$('.errors').html(errorContent);
        $('#feed-url').val("");
        $('#feed-url').focus();
        that.endWhirly();
      }, 
    });
  }
});