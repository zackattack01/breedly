class Feed < ActiveRecord::Base
  FEED_ERRORS = { 
    no_parser: "We were unable to parse your feed, make sure your feed is in a valid xml format",
    fetch_failure: "Sorry, we were unable to connect to your feed, make sure that you've entered the correct URL"
  }

  validates :author, :url, presence: true
  ### validate uniqueness when there's more seed data
  ### validates :url, uniqueness: true
  validate :parsable

  after_commit :generate_topics

  belongs_to :author, foreign_key: :user_id, class_name: 'User'
  has_many :feed_topics
  has_many :topics, through: :feed_topics

  def self.generate_feed_object(url, user_id)
    feed = Feed.create(url: url, user_id: user_id)
    feed
  end

  def entries
    entries = Feedjira::Feed.fetch_and_parse(url).entries
    entries.map! do |entry|
      entry.map { |x, y| [x.to_s.sanitize, y.to_s.sanitize] }.to_h
    end
  end

  private
  def parsable
    begin
      parsed_feed_data = Feedjira::Feed.fetch_and_parse url
    rescue Feedjira::NoParserAvailable 
      errors.add(:no_parser, FEED_ERRORS[:no_parser])
      puts "NO PARSER FOR #{url}"
    rescue Feedjira::FetchFailure
      errors.add(:no_fetch, FEED_ERRORS[:fetch_failure])
      puts "NO FETCH FOR #{url}"
    else 
      self.title = parsed_feed_data.title.to_s.sanitize
      self.description = parsed_feed_data.description.to_s.sanitize
    end
  end 

  def generate_topics
    created_topics = {}
    entries.each do |entry|
      return unless entry['categories']
      JSON.parse(entry['categories']).each do |category|
        topic = Topic.find_by_title(category)
        unless topic
          topic = Topic.create(title: category)
        end
        unless created_topics[topic]
          FeedTopic.create(feed_id: id, topic_id: topic.id)
          created_topics[topic] = true
        end
      end
    end
  end
end