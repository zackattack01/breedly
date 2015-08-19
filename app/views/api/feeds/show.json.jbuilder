json.extract!(@feed, :id, :url, :user_id, :title, :entries, :topics, :description)
if @subscribed_id
  json.subscription_id @subscribed_id
end