Breedly.Views.SearchResult = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
  },

  events: {
    'click .search-result-link': 'removeParentModal'
  },

  tagName: 'li',
  template: JST['feeds/search_result'],

  removeParentModal: function() {
    this.rootView.remove();
  },

  render: function() {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  }
});