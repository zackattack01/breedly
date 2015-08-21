Breedly.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST['feeds/search_results'],

  initialize: function(options) {
    this.rootView = options.rootView;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addSearchResultView);
    this.listenTo(this.collection, 'remove', this.removeSearchResultView);
    var that = this;
    this.collection.each(function(result) {
      that.addSearchResultView(result);
    });
  },

  addSearchResultView: function(result) {
    var resultItem = new Breedly.Views.SearchResult({ model: result, rootView: this.rootView });
    this.addSubview('.search-list', resultItem);
  },

  removeSearchResultView: function(result) {
    this.removeModelSubview('.search-list', result);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});