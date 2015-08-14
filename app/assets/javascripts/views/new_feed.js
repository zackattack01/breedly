Breedly.Views.NewFeed = Backbone.View.extend({
  initialize: function() {
    $(document).on('keyup', this.handleEscape.bind(this));
  },

  template: JST['feeds/new_feed'],

  events: {
    'click button.add-feed': 'addFeed',
    'click .close': 'remove',
    'click .modal-background': 'remove'
  },

  addFeed: function(e) {
    e.preventDefault();
    var feedUrl = $('#feed-url').serializeJSON();
    var newFeed = new Breedly.Models.Feed(feedUrl);
    var that = this;
    newFeed.save({}, {
      success: function() {
        that.remove();
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