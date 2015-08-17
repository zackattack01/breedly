Breedly.Views.EntriesIndex = Backbone.View.extend({
  template: JST['entries/entries_index'],

  initialize: function(options) {
    this.entries = this.model.entries;
  },

  events: {
    'click .entry-list-item': 'selectEntry'
  },

  selectEntry: function(e) {
    e.preventDefault();
    this.model.set('selectedEntryIdx', $(e.currentTarget).data('idx')); 
  },

  render: function() {
    var content = this.template({ entries : this.entries });
    this.$el.html(content);
    return this;
  }
});