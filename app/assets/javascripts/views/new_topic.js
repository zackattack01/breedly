Breedly.Views.NewTopic = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    $(document).on('keyup', this.handleEscape.bind(this));
    this.topics = new Breedly.Collections.Topics();
    this.topics.fetch();
  },

  template: JST['topics/new_topic'],

  events: {
    'click button.add-user-topic': 'addUserTopic',
    'click button.add-feed-topic': 'addFeedTopic',
    'click .close': 'remove',
    'click .modal-background': 'remove'
  },

  addUserTopic: function(e) {
    e.preventDefault();
    var topicTitle = $('#topic-title').val();
    var newTopic = this.topics.where({ title: topicTitle })[0];
    if (typeof newTopic === "undefined") {
      $('#topic-title').val("")
      this.$('.errors').html('<p>-There are currently no feeds with that topic.</p>')
    } else {
      var that = this;
      var userTopic = new Breedly.Models.UserTopic();
      userTopic.set({ topic_id: newTopic.id });
      this.rootView.whirl();
      userTopic.save({}, {
        success: function() {
          that.remove();
          that.rootView.refreshSubscribedFeeds();
          that.rootView.addMessage("Your interest has been noted!", "success");
          that.rootView.endWhirly();
        },

        error: function(obj, resp) {
          resp['responseJSON'].forEach(function(error) {
            that.$('.errors').html('<p>-' + error.slice(6) + '</p>');
          });
          that.rootView.endWhirly();
          $('#topic-title').val("");
        }
      });
    }
  },

  handleEscape: function(e) {
    if (e.keyCode === 27) {
      this.remove();
    }
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});