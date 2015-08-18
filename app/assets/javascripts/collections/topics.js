Breedly.Collections.Topics = Backbone.Collection.extend({
  url: 'api/topics',
  model: Breedly.Models.Topic,
  comparator: function(topic) {
    topic.get('title');
  }

  // getOrFetch: function(title) {
  //   var topics = this;
  //   var topic = this.where({ title: title })[0];
  //   if (topic) {
  //     topic.fetch();
  //   } else {
  //     topic = new Breedly.Models.Topic({ title: title });
  //     topics.add(topic);
  //     topic.fetch({
  //       error: function() {
  //         topics.remove(topic);
  //       }
  //     });
  //   }
  //   return topic;
  // }
});