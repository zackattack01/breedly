Breedly.Views.FeedShow = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.model, 'change:subscribed', this.render)
  },

  template: JST['feeds/feed_show'],

  events: {
    'click .toggle-subscribe-btn': 'toggleSubscribe'
  },

  toggleSubscribe: function(e) {
    e.preventDefault();
    this.model.toggleSubscribe();
  },

  subscribeToFeed: function(e) {
    e.preventDefault();
    var subscription = new Breedly.Models.Subscription({ feed_id: this.model.id });
    var that = this;
    this.rootView.whirl();
    subscription.save({}, {
      success: function() {
        that.rootView.refreshFeedsIndex();
        that.rootView.addMessage("Subscribed!", "success");
        that.rootView.endWhirly();
        that.render();
      },

      error: function(obj, resp) {
        that.rootView.addMessage(resp.responseJSON[0].slice(5), "error");
      }
    });
  },

  render: function() {
    var content = this.template({ feed: this.model });  
    this.$el.html(content);
    return this;
  }
});