Breedly.Views.FeedShow = Backbone.View.extend({
  template: JST['feeds/feed_show'],

  render: function() {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  }
});