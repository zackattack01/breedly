Breedly.Views.NavBar = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
  },

  template: JST['navbar'],

  events: {
    'click #update-user-btn': 'updateModal',
    'click #add-feed-btn': 'addFeedModal',
    'click #logout-btn': 'logoutUser',
    'click #user-topic-btn': 'addUserTopic',
    'click #feed-search-btn': 'addSearchModal'
  },

  addUserTopic: function(e) {
    e.preventDefault();
    var availableTopics = [];
    var topics = new Breedly.Collections.Topics();
    var that = this;
    topics.fetch({
      success: function() {
        topics.each(function(topic) {
          availableTopics.push(topic.get('title'));
        });
        $("#topic-title").autocomplete({ 
          source: availableTopics
        });
      }
    });
    var modalTopic = new Breedly.Views.NewTopic({ bg: "china-bg", rootView: this.rootView });
    $('body').append(modalTopic.render().$el); 
    modalTopic.$('#topic-title').focus();
  },

  addFeedModal: function(e) {
    e.preventDefault();
    var modalFeed = new Breedly.Views.NewFeed({ rootView: this.rootView });
    $('body').append(modalFeed.render().$el); 
    $('#feed-url').focus();
  },

  addSearchModal: function(e) {
    e.preventDefault();
    var allFeeds = new Breedly.Collections.Feeds();
    var feedTitles = [];
    var allTopics = new Breedly.Collections.Topics();
    var feedTopics = [];
    allFeeds.fetch({
      data: {
        query: "all"
      },

      success: function() {
        allFeeds.each(function(feed) {
          feedTitles.push(feed.get('title'));
        });
        $("#feed-title").autocomplete({ 
          source: feedTitles
        });
      }
    });

     allTopics.fetch({
      success: function() {
        allTopics.each(function(topic) {
          feedTopics.push(topic.get('title'));
        });
        $("#feed-topic").autocomplete({ 
          source: feedTopics
        });
      }
    });

    var modalSearch = new Breedly.Views.FeedSearch({ rootView: this.rootView, collection: allFeeds });
    $('body').append(modalSearch.render().$el); 
    $('#feed-title').focus();
  },

  updateModal: function(e) {
    e.preventDefault();
    var user = new Breedly.Models.User({ id: Breedly.CURRENT_USER_ID });
    user.fetch();
    var modal = new Breedly.Views.UserUpdate({ model: user, rootView: this.rootView });
    $('body').append(modal.render().$el);
  },

  logoutUser: function(e) {
    e.preventDefault();
    var session = new Breedly.Models.Session();
    session.logout();
  },

  onRender: function() {
    this.delegateEvents();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});