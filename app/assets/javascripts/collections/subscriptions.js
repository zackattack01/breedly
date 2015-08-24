Breedly.Collections.Subscriptions = Backbone.Collection.extend({
  url: 'api/subscriptions',
  model: Breedly.Models.Subscription

  // getOrFetchByFeedId: function(feedId) {
  //   var subs = this;
  //   var sub = this.where({ feed_id: feedId })[0];
  //   if (sub) {
  //     sub.fetch();
  //   } else {
  //     sub = new Breedly.Models.Subscription({ feed_id: feedId });
  //     subs.add(sub);
  //     sub.fetch({
  //       error: function() {
  //         subs.remove(sub);
  //       }
  //     });
  //   }
  //   return sub;
  // }
});