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
        that.feedCount = that.feeds.models.length
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
  className: 'navbar symphony navbar-fixed-top',

  events: {
    'click #update-user-btn': 'updateModal',
    'click #add-feed-btn': 'addFeedModal',
    'click #logout-btn': 'logoutUser',
    'click #user-topic-btn': 'addUserTopic',
    'click #feed-search-btn': 'addCustomSearchModal',
    'click #nav-feed-search': 'searchByTitle',
    'click #random-feed': 'randomFeedRedirect'
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
      this.$('#feed-title').val("sorry not here :(")
    } else {
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

    var modalSearch = new Breedly.Views.FeedSearch({ rootView: this.rootView, collection: this.feeds });
    $('body').append(modalSearch.render().$el); 
    $('#topic-title').focus();
  },

  randomFeedRedirect: function(e) {
    e.preventDefault();
    var max = this.feedCount || 500
    var selectedFeedId = Math.floor(Math.random() * max)
    selectedFeedId = (selectedFeedId === 0 ? 1 : selectedFeedId);
    Backbone.history.navigate('feeds/' + selectedFeedId, { trigger: true });
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