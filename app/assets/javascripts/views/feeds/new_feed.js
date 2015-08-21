Breedly.Views.NewFeed = Backbone.ModalView.extend({
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
    this.whirl();
    newFeed.save({}, {

      success: function() {
        that.endWhirly();
        that.remove();
        that.rootView.addMessage(newFeed.get('title') + " added!", "success");
        Backbone.history.navigate('feeds/' + newFeed.id, { trigger: true });
      },

      error: function(obj, resp) {
        for(var errorType in resp['responseJSON']) {
          that.$('.errors').html('<li>' + resp['responseJSON'][errorType] + '</li>');
        };
        $('#public-feed-url').val("");
        $('#public-feed-url').focus();
        that.endWhirly();
      }, 
    });
  }
});