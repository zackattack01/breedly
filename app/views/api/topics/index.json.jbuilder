json.array!(@topics) do |topic|
  json.extract!(topic, :title, :id)
end