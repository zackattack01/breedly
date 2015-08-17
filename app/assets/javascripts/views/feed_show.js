Breedly.Views.FeedShow = Backbone.View.extend({
  template: JST['feeds/feed_show'],

  initialize: function(options) {
    // this.descView = options.desc || new Breedly.Views.FeedDescription({ model: this.model });
    this.listenTo(this.model, 'sync change', this.render);
  },

  render: function() {
    // var content;
    // if (this.model.get('selectedEntryIdx') === -1) {
    //   content = this.descView.template({ feed: this.model });
    // } else {
    var content = this.template({ feed: this.model });  
    // }
    
    this.$el.html(content);
    return this;
  }
});