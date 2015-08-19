json.array! @subscriptions do |subscription|
  json.extract!(subscription, :user_id, :feed_id, :id)
end