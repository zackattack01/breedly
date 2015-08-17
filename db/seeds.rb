feeds = [
  "http://feeds.reuters.com/reuters/topNews",
  "http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&output=rss",
  "http://rss.cnn.com/rss/edition.rss",
  "http://www.foxnews.com/about/rss/feedburner/foxnews/latest",
  "http://feeds.bbci.co.uk/news/rss.xml",
  "http://news.sky.com/feeds/rss/home.xml",
  "http://feeds.nbcnews.com/feeds/worldnews",
  "http://www.cbsnews.com/feeds/rss/main.rss",
  "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  "http://feeds.abcnews.com/abcnews/topstories",
  "http://feeds.feedburner.com/cnet/tcoc",
  "http://www.ft.com/rss/home/us",
  "http://everylibrary.tumblr.com/rss",
  "http://peachandlily.tumblr.com/rss",
  "http://bloomingdales.tumblr.com/rss",
  "http://vinylstores.tumblr.com/rss",
  "http://markruffalo.tumblr.com/rss",
  "http://harpercollinschildrens.tumblr.com/rss",
  "http://salonserpenttattoo.tumblr.com/rss",
  "http://deep-dark-fears.tumblr.com/rss",
  "http://foodphotographytravel.tumblr.com/rss",
  "http://lookdifferentmtv.tumblr.com/rss",
  "http://powerlinesinanime.tumblr.com/rss"
  ]

User.create(username: "admin", real_name: "zack", password: "password", age: 23, age_min: 20, age_max: 80)
Feed.generate_feed_object("http://zactal.tumblr.com/rss", 1)

100.times do |i|
  name = Faker::Name.name 
  User.create(
    username: name.split('').join,
    real_name: name,
    age: rand(100),
    password: "password",
    age_min: rand(18..26),
    age_max: rand(27..100)
  )

  Feed.generate_feed_object(feeds.sample, i + 2)
end