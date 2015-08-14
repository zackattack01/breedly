class Feed < ActiveRecord::Base
  FEED_ERRORS = { 
    no_parser: "We were unable to parse your feed, make sure your feed is in a valid xml format",
    fetch_failure: "Sorry, we were unable to connect to your feed, make sure that you've entered the correct URL"
  }

  validates :user, :url, presence: true
  ### validate uniqueness when there's more seed data
  ##validates :url, uniqueness: true
  validate :parsable

  belongs_to :user

  def self.generate_feed_object(url, user_id)
    feed = Feed.create(url: url, user_id: user_id)
    feed
  end

  def entries
    entries = Feedjira::Feed.fetch_and_parse(url).entries
    entries.map! { |entry| entry.to_h }
  end

  private
  def parsable
    begin
      parsed_feed_data = Feedjira::Feed.fetch_and_parse url
    rescue Feedjira::NoParserAvailable 
      errors.add(:no_parser, FEED_ERRORS[:no_parser])
      puts "NO PARSER"
    rescue Feedjira::FetchFailure
      errors.add(:no_fetch, FEED_ERRORS[:fetch_failure])
      puts "NO FETCH"
    else 
      self.title = parsed_feed_data.title
    end
  end 
end