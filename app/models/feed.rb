class Feed < ActiveRecord::Base
  FEED_ERRORS = { 
    no_parser: "We were unable to parse your feed, make sure you've entered a valid xml format",
    fetch_failure: "We were unable to connect to your feed, make sure that you've entered the correct URL"
  }

  validates :author, :url, presence: true
  ### validate uniqueness when there's more seed data
  ### validates :url, uniqueness: true
  validate :parsable

  after_commit :generate_topics

  belongs_to :author, foreign_key: :user_id, class_name: 'User'
  has_many :feed_topics
  has_many :topics, through: :feed_topics

  scope :public_feed, -> { where(user_id: 1) }

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
      errors.add(:feed, FEED_ERRORS[:no_parser])
    rescue NoMethodError
      errors.add(:feed, FEED_ERRORS[:fetch_failure])
    rescue URI::InvalidURIError 
      errors.add(:feed, FEED_ERRORS[:fetch_failure])
    rescue Feedjira::FetchFailure
      errors.add(:feed, FEED_ERRORS[:fetch_failure])
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