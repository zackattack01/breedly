Breedly.Views.NewFeed = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
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
        that.rootView.addSuccess(newFeed.get('title') + " has been added to your personal feeds.");
      },

      error: function(obj, resp) {
        resp['responseJSON'].forEach(function(error) {
           that.$('.errors').html('<p>-' + error.slice(5) + '</p>');
           $('#feed-url').val("");
           $('#feed-url').focus();
        });
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