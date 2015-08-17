json.array!(@user_topics) do |user_topic|
  json.extract!(user_topic, :id, :title)
end