class Feed < ActiveRecord::Base
  FEED_ERRORS = { 
    no_parser: "We were unable to parse your feed, make sure your feed is in a valid xml format",
    fetch_failure: "Sorry, we were unable to connect to your feed, make sure that you've entered the correct URL",
    no_update: "We were unable to update your feed, please make sure you have the correct url in xml format"
  }

  attr_accessor :data

  validates :user, :url, presence: true
  validates :url, uniqueness: true
  validate :parsable

  belongs_to :user

  def self.generate_feed_object(url, user_id)
    feed = Feed.create!(url: url, user_id: user_id)
    feed
  end

  private
  def parsable
    begin
      parsed_feed_data = Feedjira::Feed.fetch_and_parse url
    rescue Feedjira::NoParserAvailable 
      errors.add(:no_parser, FEED_ERRORS[:no_parser])
    rescue Feedjira::FetchFailure
      errors.add(:no_fetch, FEED_ERRORS[:fetch_failure])
    end 
    feed.data = parsed_feed_data
  end 
end