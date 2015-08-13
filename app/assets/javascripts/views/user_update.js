Breedly.Views.UserUpdate = Backbone.View.extend({
  template: JST['users/update'],

  events: {
    'click form button.submit': 'submitUpdate',
    'click button.add-feed': 'addFeed'
  },

  submitUpdate: function(e) {
    e.preventDefault();
    var userData = $('#user-update').serializeJSON();

    this.model.set(userData);
    var that = this;
    that.model.save({}, {
      success: function() {
        Backbone.history.navigate('/', { trigger: true });
      },

      error: function(resp) {
        //do something with response errors
        console.log(resp);
      }
    });   
  },

  addFeed: function(e) {
    e.preventDefault();
    var feedUrl = $('#feed_url').serializeJSON();
    var newFeed = new Breedly.Models.Feed(feedUrl);
    debugger;
    var that = this;
    newFeed.save({}, {
      success: function() {
        that.render();
      },

      error: function(resp) {
        console.log(resp);
      }, 
    });
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});