Breedly.Views.FeedIndexItem = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
    this.clicked = false;
  },

  tagName: 'li',
  template: JST['feeds/feeds_index_item'],

  events: {
    'mouseenter .feed-list-item': 'addDescription',
    'mouseleave .feed-list-item': 'removeDescription'
    // 'click .feed-list-item': 'whirly'
  },

  // whirly: function() {
  //   this.rootView.whirl();
  // },

  addDescription: function(e) {
    e.preventDefault();
    var descriptionView = new Breedly.Views.FeedDescription({ model: this.model });
    this.rootView.showFeedDescription(descriptionView);
  },

  removeDescription: function(e) {
    e.preventDefault();
    this.rootView.removeFeedDescription();
  },

  render: function() {
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  }
});