Breedly.Views.UserUpdate = Backbone.View.extend({
  template: JST['users/update'],

  events: {
    'click form button.submit': 'submitUpdate'
  },

  submitUpdate: function(e) {
    e.preventDefault();
    var userData = $('#user-update').serializeJSON();

    if (userData.user['feed_url']) {
      //if there is a url and it isn't valid, let addFeed take
      //care of deleting it before updating the user
      this.addFeed(userData);
    } else {
      this.updateUserSettings(userData);
    }
  },

  updateUserSettings: function(userData) {
    this.model.set(userData);
    var that = this;
    that.model.save({}, {
      success: function() {
        Backbone.history.navigate('/', { trigger: true });
      }
    });
  },

  addFeed: function(userData) {
    var newFeed = new Breedly.Models.Feed({ url: userData.user['feed_url'] });
    var that = this;
    newFeed.save({}, {
      error: function(resp) {
        console.log("validation flow works or your feed is bad");
        delete userData.feed_url;
        that.updateUserSettings(userData);
      }, 
      success: function() {
        that.updateUserSettings(userData);
      }
    });
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});