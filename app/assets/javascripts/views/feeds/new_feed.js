Breedly.Views.NewFeed = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    $(document).on('keyup', this.handleEscape.bind(this));
  },

  template: JST['feeds/new_public_feed'],

  events: {
    'click button.add-public-feed': 'addPublicFeed',
    'click .close': 'remove',
    'click .modal-background': 'remove'
  },

  addPublicFeed: function(e) {
    e.preventDefault();
    var feedUrl = $('#public-feed-url').serializeJSON();
    
    var newFeed = new Breedly.Models.Feed(feedUrl);
    newFeed.set("public", true);
    var that = this;
    this.rootView.whirl();
    debugger;
    newFeed.save({}, {

      success: function() {
        that.remove();
        that.rootView.endWhirly();
        that.rootView.addMessage(newFeed.get('title') + " added!", "success");
        Backbone.history.navigate('feeds/' + newFeed.id, { trigger: true });
      },

      error: function(obj, resp) {
        resp['responseJSON'].forEach(function(error) {
          that.$('.errors').html('<ul><li>' + error.slice(5) + '</li></ul>');
        });
        $('#pulic-feed-url').val("");
        $('#pulic-feed-url').focus();
        that.rootView.endWhirly();
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