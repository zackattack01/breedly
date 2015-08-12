Breedly.Views.UserUpdate = Backbone.View.extend({
  template: JST['users/update'],

  events: {
    'click form button.submit': 'update'
  },

  update: function(e) {
    e.preventDefault();
    var userData = $('#user-update').serializeJSON();

    //if there is a url and it isn't valid, delete it before it gets set
    if (userData.user['feed_url'] && !this.addFeed(userData.user['feed_url'])) {
      delete userData.feed_url;
    }
    this.model.set(userData);
    var that = this;
    that.model.save({}, {
      success: function() {
        that.model.fetch();
        Backbone.history.navigate('/', { trigger: true });
      }
    });
  },

  addFeed: function(url) {
    var newFeed = new Breedly.Models.Feed({ url: url });
    newFeed.save({}, {
      error: function(resp) {
        //probably should make an error template flash thing
        console.log("validation flow works");
        return false;
      }, 
      success: function() {
        return true;
      }
    });
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});