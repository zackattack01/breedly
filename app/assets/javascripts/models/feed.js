Breedly.Models.Feed = Backbone.Model.extend({
  urlRoot: 'api/feeds',

  initialize: function() {
    this.set('selectedEntryIdx', -1);
  },

  parse: function(response) {
    if (response.entries) {
      this.entries = response.entries;
      delete response.entries;
    }

    if (response.topics) {
      this.topics().set(response.topics);
      delete response.topics;
    }
    return response;
  },

  topics: function() {
    if (!this._topics) {
      this._topics = new Breedly.Collections.FeedTopics([], { feed: this });
    }
    return this._topics;
  }
}); 