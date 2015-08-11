json.array! @feeds do |feed|
  json.extract!(feed, :id, :url)
end

## will need to extract title and body and all other necessary info here