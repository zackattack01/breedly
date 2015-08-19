Breedly.Models.Feed = Backbone.Model.extend({
  urlRoot: 'api/feeds',

  initialize: function() {
    this.set('selectedEntryIdx', 0);
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

    if (response.subscription_id) {
      this.subscription().set({ id: response.subscription_id });
      this.set("subscribed", "subscribed");
    }

    return response;
  },

  topics: function() {
    if (!this._topics) {
      this._topics = new Breedly.Collections.FeedTopics([], { feed: this });
    }
    return this._topics;
  },

  subscription: function () {
    if (!this._subscription) {
      this._subscription = new Breedly.Models.Subscription();
    }
    return this._subscription;
  },

  createSubscription: function () {
    this.subscription().set({ feed_id: this.id });
    this.subscription().save({}, {
      success: function () {
        this.updateStatus("subscribed");
      }.bind(this)
    });
  },

  destroySubscription: function () {
    this.subscription().destroy({
      success: function (model) {
        model.unset("id");
        this.updateStatus("unsubscribed");
      }.bind(this)
    });
  },

  toggleSubscribe: function () {
    if (this.subscription().isNew()) {
      this.createSubscription();
    } else {
      this.destroySubscription();
    }
  },

  updateStatus: function (status) {
    this.set("subscribed", status);
  }
}); 