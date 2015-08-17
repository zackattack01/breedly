Breedly.Views.FeedIndexItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['feeds/feeds_index_item'],

  //figure out how to remove on mouseleave of just the link
  events: {
    'mouseenter .feed-list-item .feed-list-link': 'addDescription',
    'mouseleave .feed-list-link': 'removeDescription'
  },

  addDescription: function(e) {
    e.preventDefault();
    $(e.currentTarget).append('<p class="desc">' + this.model.get('description') + '</p>');
  },

  removeDescription: function(e) {
    e.preventDefault();
    $(e.currentTarget).find('.desc').remove();
  },

  render: function() {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  }
});
