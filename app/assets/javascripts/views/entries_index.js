Breedly.Views.EntriesIndex = Backbone.View.extend({
  template: JST['entries/entries_index'],

  initialize: function(entries) {
    this.entries = entries;
  },

  render: function() {
    var content = this.template({ entries : this.entries.entries });
    this.$el.html(content);
    return this;
  }  
});