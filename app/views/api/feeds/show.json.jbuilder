json.extract!(@feed, :id, :url, :user_id, :title)
parsed_feed = Feedjira::Feed.fetch_and_parse @feed.url
json.entries do 
  json.extract!(parsed_feed, :entries)
end