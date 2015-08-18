Breedly.Views.NavBar = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
  },

  template: JST['navbar'],

  events: {
    'click #update-user-btn': 'updateModal',
    'click #add-feed-btn': 'addFeedModal',
    'click #logout-btn': 'logoutUser',
    'click #user-topic-btn': 'addUserTopic'
  },

  addUserTopic: function(e) {
    e.preventDefault();
    var modalTopic = new Breedly.Views.NewTopic({ rootView: this.rootView });
    $('body').append(modalTopic.render().$el); 
    $('#topic-title').focus();
  },

  addFeedModal: function(e) {
    e.preventDefault();
    var modalFeed = new Breedly.Views.NewFeed();
    $('body').append(modalFeed.render().$el); 
    $('#feed-url').focus();
  },

  updateModal: function(e) {
    e.preventDefault();
    var user = new Breedly.Models.User({ id: Breedly.CURRENT_USER_ID });
    user.fetch();
    var modal = new Breedly.Views.UserUpdate({ model: user });
    $('body').append(modal.render().$el);
  },

  logoutUser: function(e) {
    e.preventDefault();
    var session = new Breedly.Models.Session();
    session.logout();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});