Breedly.Views.EntriesIndex = Backbone.View.extend({
  template: JST['entries/entries_index'],

  initialize: function(options) {
    this.entries = this.model.entries;
    this.rootView = options.rootView;
  },

  events: {
    'click .entry-list-item': 'selectEntry'
  },

  selectEntry: function(e) {
    e.preventDefault();
    $('li').removeClass('active-entry');
    $(e.currentTarget).parent().addClass('active-entry');
    this.model.set('selectedEntryIdx', $(e.currentTarget).data('idx')); 
    this.rootView.removeFeedDescription();
  },

  render: function() {
    var content = this.template({ entries: this.entries, activeIdx: this.model.get('selectedEntryIdx') });
    this.$el.html(content);
    return this;
  }
});