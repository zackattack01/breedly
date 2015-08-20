json.array! @feeds do |feed|
  json.extract!(feed, :title, :id)
end
