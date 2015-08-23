Breedly.Views.NavBar = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    this.feeds = new Breedly.Collections.Feeds();
    var feedTitles = [];
    var that = this;
    this.feeds.fetch({
      data: {
        query: "all"
      },

      success: function() {
        that.feeds.each(function(feed) {
          feedTitles.push(feed.get('title'));
        });
        $("#feed-title").autocomplete({ 
          source: feedTitles
        });
      }
    });
  },

  template: JST['navbar'],
  tagName: 'nav',
  className: 'navbar navbar-fixed-top',

  events: {
    'click #update-user-btn': 'updateModal',
    'click #add-feed-btn': 'addFeedModal',
    'click #logout-btn': 'logoutUser',
    'click #user-topic-btn': 'addUserTopic',
    'click #feed-search-btn': 'addCustomSearchModal',
    'click #nav-feed-search': 'searchByTitle'
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
    var modalTopic = new Breedly.Views.NewTopic({ rootView: this.rootView });
    $('body').append(modalTopic.$el); 
    modalTopic.render();
    modalTopic.$('#topic-title').focus();
  },

  searchByTitle: function(e) {
    e.preventDefault();
    var title = this.$('#feed-title').val();
    var newFeed = this.feeds.where({ title: title })[0];
    this.$('#feed-title').val("");
    if (typeof newFeed === "undefined") {
      // this.$('#feed-title').val("")
      // this.$('.errors').html('<li>There are currently no feeds with that title.</li>')
    } else {
      // this.remove();
      Backbone.history.navigate('feeds/' + newFeed.id, { trigger: true });  
    }
  },

  addFeedModal: function(e) {
    e.preventDefault();
    var modalFeed = new Breedly.Views.NewFeed({ rootView: this.rootView });
    $('body').append(modalFeed.$el);
    modalFeed.render(); 
    $('#feed-url').focus();
  },

  addCustomSearchModal: function(e) {
    e.preventDefault();
    var allTopics = new Breedly.Collections.Topics();
    var feedTopics = [];

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