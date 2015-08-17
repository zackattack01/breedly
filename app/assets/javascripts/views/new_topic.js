Breedly.Views.NewTopic = Backbone.View.extend({
  initialize: function() {
    $(document).on('keyup', this.handleEscape.bind(this));
    this.topics = new Breedly.Collections.Topics();
    this.topics.fetch();
  },

  template: JST['topics/new_topic'],

  events: {
    'click button.add-topic': 'addTopic',
    'click .close': 'remove',
    'click .modal-background': 'remove'
  },

  addTopic: function(e) {
    e.preventDefault();
    var topicTitle = $('#topic-title').val();
    var newTopic = this.topics.getOrFetch(topicTitle);
    var that = this;
    var userTopic = new Breedly.Models.UserTopic();
    userTopic.set({ topic_id: newTopic.id });
    userTopic.save({}, {
      success: function() {
        that.remove();
        console.log("new user topic created")
      },

      error: function(resp) {
        console.log(resp);
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