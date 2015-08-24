json.array! @feeds do |feed|
  json.extract!(feed, :id, :url, :user_id, :title, :description, :topics)
  @subscribed_ids && sub_id = @subscribed_ids.find_by_feed_id(feed.id)
  sub_id && json.subscription_id(sub_id)
end