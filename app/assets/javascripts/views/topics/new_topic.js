Breedly.Views.NewTopic = Backbone.ModalView.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    this.topics = new Breedly.Collections.Topics();
    this.topics.fetch();
    Backbone.ModalView.prototype.initialize.call(this, "circled");
  },

  template: JST['topics/new_topic'],

  events: {
    'click button.add-user-topic': 'addUserTopic',
    'click #generate-suggestions': 'showSortedTopics'
  },

  addUserTopic: function(e) {
    e.preventDefault();
    var topicTitle = $('#topic-title').val();
    var newTopic = this.topics.where({ title: topicTitle })[0];
    if (typeof newTopic === "undefined") {
      $('#topic-title').val("")
      var errorView = new Breedly.Views.Error({
        model: "There are currently no feeds with that topic."
      });
      this.$('.errors').html(errorView.render().$el);
    } else {
      var that = this;
      var userTopic = new Breedly.Models.UserTopic();
      userTopic.set({ topic_id: newTopic.id });
      this.whirl();
      userTopic.save({}, {
        success: function() {
          var successView = new Breedly.Views.Success({
            model: "Your interest has been noted!"
          });
          this.$('.errors').html(successView.render().$el);
          that.endWhirly();
          $('#topic-title').val("");
        },

        error: function(obj, resp) {
          var errorView = new Breedly.Views.Error({
            model: "You're already interested in this topic."
          });
          that.$('.errors').html(errorView.render().$el);
          that.endWhirly();
          $('#topic-title').val("");
        }
      });
    }
  },

  showSortedTopics: function() {
    var sortedFeeds = new Breedly.Collections.Feeds();
    this.whirl();
    var that = this;
    sortedFeeds.fetch({
      data: { query: 'sorted' },
      success: function(obj, resp) {
        var searchResults = new Breedly.Views.SearchResults({ 
          collection: sortedFeeds, rootView: that.rootView 
        });

        that.$('.errors').empty();
        that.swapResults(searchResults);
        that.endWhirly();
      },

      error: function(obj, resp) {
        var errorView = new Breedly.Views.Error({
          model: "You'll need to add more interests!"
        })
        that.$('.errors').html(errorView.render().$el);
        that.endWhirly();
      }
    });
  },

  swapResults: function(searchResults) {
    this._currentResults && 
    this.removeSubview('.search-result-content', this._currentResults);
    this.addSubview('.search-result-content', searchResults);
    this._currentResults = searchResults;
  },
});