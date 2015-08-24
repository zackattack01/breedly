json.array! @feeds do |feed|
  json.extract!(feed, :id, :url, :user_id, :title, :description, :topics)
  @subscriptions && sub = @subscriptions.find_by_feed_id(feed.id)
  sub && json.subscription_id(sub.id)
end