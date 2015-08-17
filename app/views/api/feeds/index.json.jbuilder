json.array! @feeds do |feed|
  json.extract!(feed, :id, :url, :user_id, :title, :description)
end