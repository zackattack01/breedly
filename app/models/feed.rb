class Feed < ActiveRecord::Base
  FEED_ERRORS = { 
    no_parser: "We were unable to parse your feed, make sure your feed is in a valid xml format",
    fetch_failure: "Sorry, we were unable to connect to your feed, make sure that you've entered the correct URL",
    no_update: "We were unable to update your feed, please make sure you have the correct url in xml format"
  }

  validates :user, :url, presence: true

  belongs_to :user

  attr_reader :data

  def self.generate_feed_object(url, user_id)
    begin
      parsed_feed_data = Feedjira::Feed.fetch_and_parse url
    rescue Feedjira::NoParserAvailable 
      @feed.errors.full_messages << FEED_ERRORS[:no_parser]
      return nil
    rescue Feedjira::FetchFailure
      @feed.errors.full_messages << FEED_ERRORS[:fetch_failure]
      return nil
    end
    feed = Feed.create!(url: url, user_id: user_id)
    feed.data = parsed_feed_data
    feed
  end
end