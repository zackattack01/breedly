Breedly.Views.SearchResult = Backbone.View.extend({
  tagName: 'li',
  template: JST['feeds/search_result'],

  render: function() {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  }
});