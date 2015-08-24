Breedly.Views.EntryTeaser = Backbone.View.extend({
    template: JST['entries/entry_teaser'],

    render: function() {
      var content = this.template({ entry: this.model });
      this.$el.html(content);
      return this;
    } 
});