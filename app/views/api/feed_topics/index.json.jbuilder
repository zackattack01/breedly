json.array!(@feed_topics) do |feed_topic|
  json.extract!(feed_topic, :id, :title)
end