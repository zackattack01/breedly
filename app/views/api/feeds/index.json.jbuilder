json.array! @feeds do |feed|
  json.extract!(feed, :id, :url, :data)
end