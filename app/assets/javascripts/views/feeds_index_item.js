Breedly.Views.FeedIndexItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['feeds/feeds_index_item'],

  render: function() {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  }
});
