Breedly.Views.NewTopic = Backbone.ModalView.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    this.topics = new Breedly.Collections.Topics();
    this.topics.fetch();
    Backbone.ModalView.prototype.initialize.call(this, "china-bg");
  },

  template: JST['topics/new_topic'],

  events: {
    'click button.add-user-topic': 'addUserTopic',
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
      this.whirl();
      userTopic.save({}, {
        success: function() {
          that.remove();
          that.rootView.addMessage("Your interest has been noted!", "success");
          that.endWhirly();
        },

        error: function(obj, resp) {
          var errorContent = ""
          for(var errorType in resp['responseJSON']) {
            errorContent += ('<li>' + resp['responseJSON'][errorType] + '</li>');
          };
          that.$('.errors').html(errorContent);
          that.endWhirly();
          $('#topic-title').val("");
        }
      });
    }
  }
});