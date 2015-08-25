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
          that.remove();
          that.rootView.addMessage("Your interest has been noted!", "success");
          that.endWhirly();
        },

        error: function(obj, resp) {
          var errorContent = ""
          for(var errorType in resp['responseJSON']) {
            errorContent += (resp['responseJSON'][errorType] + "\n");
          };
          var errorView = new Breedly.Views.Error({
            model: errorContent
          });
          that.$('.errors').html(errorView.render().$el);
          that.endWhirly();
          $('#topic-title').val("");
        }
      });
    }
  }
});