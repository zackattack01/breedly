Breedly.Views.NavBar = Backbone.View.extend({
  template: JST['navbar'],

  events: {
    'click #update-user-btn': 'updateModal',
    'click #add-feed-btn': 'addFeedModal'
  },

  addFeedModal: function(e) {
    e.preventDefault();
    var modalFeed = new Breedly.Views.NewFeed();
    $('body').append(modalFeed.render().$el); 
  },

  updateModal: function(e) {
    e.preventDefault();
    var user = new Breedly.Models.User({ id: Breedly.CURRENT_USER_ID });
    user.fetch();
    var modal = new Breedly.Views.UserUpdate({ model: user });
    $('body').append(modal.render().$el);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});