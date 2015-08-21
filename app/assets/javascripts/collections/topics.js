Breedly.Collections.Topics = Backbone.Collection.extend({
  url: 'api/topics',
  model: Breedly.Models.Topic,
  comparator: function(topic) {
    topic.get('title');
  }
});