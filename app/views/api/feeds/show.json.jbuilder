json.extract!(@feed, :id, :url, :author_name, :title, :entries, :topics, :description)
if @subscribed_id
  json.subscription_id @subscribed_id
end