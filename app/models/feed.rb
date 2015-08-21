class Feed < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  FEED_ERRORS = { 
    no_parser: "We were unable to parse your feed, make sure you've entered a valid xml format",
    fetch_failure: "We were unable to connect to your feed, make sure that you've entered the correct URL"
  }

  validates :author, :url, presence: true
  validates :url, uniqueness: true
  validate :parsable

  after_commit :generate_topics

  belongs_to :author, foreign_key: :user_id, class_name: 'User'
  has_many :feed_topics, dependent: :destroy
  has_many :topics, through: :feed_topics

  has_many :subscriptions, dependent: :destroy
  has_many :subscribed_users, through: :subscriptions, source: :user

  scope :public_feeds, -> { where(user_id: 1) }

  def self.generate_feed_object(url, user_id)
    feed = Feed.create(url: url, user_id: user_id)
    feed
  end

  def entries
    begin
      entries = Feedjira::Feed.fetch_and_parse(url).entries
    rescue StandardError
      return []
    else
      entries.map! do |entry|
        entry.map do |key, value| 
          if key == "published" && value && value.class == Time
            ["timestamp", "posted #{time_ago_in_words(value)} ago."]
          else
            [key.sanitize, value.to_s.sanitize] 
          end
        end.to_h
      end
    end
  end

  private
  def parsable
    begin
      parsed_feed_data = Feedjira::Feed.fetch_and_parse url
    
    ## check if its a tumblr or responds to rss on the end
    rescue Feedjira::NoParserAvailable 
      unless url =~ /\/rss\/?$/ || url =~ /\.xml\/?$/
        self.url = self.url + (url[-1] == "/" ? "rss" : "/rss")
        puts "#{url} PARSE ERROR RETRYING"
        retry
      end
      puts "#{url} PARSE ERROR"
      errors.add(:feed, FEED_ERRORS[:no_parser])
    rescue NoMethodError
      errors.add(:feed, FEED_ERRORS[:fetch_failure])
      puts "#{url} NO METHOD ERROR"
    rescue URI::InvalidURIError 
      errors.add(:feed, FEED_ERRORS[:fetch_failure])
      puts "#{url} INVALID URI"
    rescue Feedjira::FetchFailure
      errors.add(:feed, FEED_ERRORS[:fetch_failure])
      puts "#{url} NO FETCH ERROR"
    else 
      self.title = parsed_feed_data.title.to_s.sanitize 
      self.title = url if title == ""
      self.description = parsed_feed_data.description.to_s.sanitize
    end
  end 

  def generate_topics
    created_topics = {}
    entries.each do |entry|
      return unless entry['categories']
      JSON.parse(entry['categories']).each do |category|
        topic = Topic.find_by_title(category.downcase)
        unless topic
          topic = Topic.create(title: category.downcase)
        end
        unless created_topics[topic]
          FeedTopic.create(feed_id: id, topic_id: topic.id)
          created_topics[topic] = true
        end
      end
    end
  end
end