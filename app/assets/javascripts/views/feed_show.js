Breedly.Views.FeedShow = Backbone.View.extend({
  template: JST['feeds/feed_show'],

  initialize: function() {
    this.listenTo(this.model, 'sync change', this.render);
  },

  render: function() {
    console.log("RENDER FROM FEEDSHOW")
    var content = this.template({ feed: this.model });
    this.$el.html(content);
    return this;
  }
});