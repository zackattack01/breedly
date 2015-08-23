Breedly.Views.FeedIndexItem = Backbone.View.extend({
  initialize: function(options) {
    this.rootView = options.rootView;
  },

  tagName: 'li',
  template: JST['feeds/feeds_index_item'],

  events: {
    'mouseenter .feed-list-link': 'addDescription',
    'mouseleave .feed-list-link': 'removeDescription',
    'click .feed-list-link': 'addActive'
  },

  addActive:function(e) {
    $('#feed-list li').removeClass('active-feed');
    $(e.delegateTarget).addClass('active-feed');
  },

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