Breedly.Views.SearchResult = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    this.listenTo(this.model, 'change:subscribed', this.render);
    this.listenTo(this.model, 'change:subscribed', this.rootView.refreshSubscribedFeeds.bind(options.rootView));
  },
  
  tagName: 'tr',
  template: JST['feeds/search_result'],

  events: {
    'click .toggle-subscribe-btn': 'toggleSubscribe'
  },

  toggleSubscribe: function(e) {
    e.preventDefault();
    this.model.toggleSubscribe();
  },

  render: function() {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  }
});