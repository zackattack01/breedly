Breedly.Views.FeedDescription = Backbone.View.extend({
    template: JST['feeds/feed_desc'],

    render: function() {
      var content = this.template({ feed: this.model });
      this.$el.html(content);
      return this;
    } 
});