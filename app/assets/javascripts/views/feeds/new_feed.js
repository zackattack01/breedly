Breedly.Views.NewFeed = Backbone.ModalView.extend({
  initialize: function(options) {
    Backbone.ModalView.prototype.initialize.call(this, "feathered");
  },

  template: JST['feeds/new_public_feed'],

  events: {
    'submit': 'addPublicFeed'
  },

  addPublicFeed: function(e) {
    e.preventDefault();
    var feedUrl = $('#public-feed-url').serializeJSON();
    
    var newFeed = new Breedly.Models.Feed(feedUrl);
    newFeed.set("public", true);
    var that = this;
    this.whirl();
    newFeed.save({}, {

      success: function() {
        that.endWhirly();
        that.remove();
        that.rootView.addMessage(newFeed.get('title') + " added!", "success");
        Backbone.history.navigate('feeds/' + newFeed.id, { trigger: true });
      },

      error: function(obj, resp) {
        var errorContent = ""
        for(var errorType in resp['responseJSON']) {
          errorContent += ('<li>' + resp['responseJSON'][errorType] + '</li>');
        };
        that.$('.errors').html(errorContent);
        $('#public-feed-url').val("");
        $('#public-feed-url').focus();
        that.endWhirly();
      }, 
    });
  }
});