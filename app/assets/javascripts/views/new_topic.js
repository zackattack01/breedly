Breedly.Views.NewTopic = Backbone.View.extend({
  initialize: function() {
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

  //if the topic doesn't exist, create it
  addUserTopic: function(e) {
    e.preventDefault();
    var topicTitle = $('#topic-title').val();
    var newTopic = this.topics.getOrFetch(topicTitle);
    var that = this;
    var userTopic = new Breedly.Models.UserTopic();
    userTopic.set({ topic_id: newTopic.id });
    userTopic.save({}, {
      success: function() {
        that.remove();
      },

      error: function(resp) {
        console.log(resp);
        $('#topic-title').val("")
      }, 
    });
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