class Feed < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  FEED_ERRORS = { 
    no_parser: "We were unable to parse your feed, make sure you've entered a valid xml format",
    fetch_failure: "We were unable to connect to your feed, make sure that you've entered the correct URL"
  }

  INSTAGRAM = lambda do |env|
    node      = env[:node]
    node_name = env[:node_name]
    return unless node.element?
    return unless node_name == 'script' && node['src'] == "//platform.instagram.com/en_US/embeds.js"
    {:node_whitelist => [node]}
  end

  YOUTUBE = lambda do |env|
    node = env[:node]
    node_name = env[:node_name]
    return if env[:is_whitelisted] || !node.element?
    return unless node_name == 'iframe'
    return unless node['src'] =~ %r|\A(?:https?:)?//(?:www\.)?youtube(?:-nocookie)?\.com/|
    Sanitize.node!(node, {
      :elements => %w[iframe],
      :attributes => {
        'iframe'  => %w[allowfullscreen frameborder height src width]
      }
    })
    {:node_whitelist => [node]}
  end

  SANITIZATION_OPTIONS = Sanitize::Config.merge(Sanitize::Config::RELAXED,
    :elements => Sanitize::Config::RELAXED[:elements] + ['video', 'source'],
    :attributes => Sanitize::Config.merge(Sanitize::Config::RELAXED[:attributes], 
     'video' => ['width', 'height', 'data-crt-options', 'poster'],
     'source' => ['src', 'type'] 
    ),

    :protocols => Sanitize::Config.merge(Sanitize::Config::RELAXED[:protocols],
      'a'   => {'href' => ['ftp', 'http', 'https', 'mailto']},
      :all => {'src'  => ['http', 'https', :relative]}
    ),

    :transformers => [YOUTUBE, INSTAGRAM]
  )
  

  validates :author, :url, presence: true
  validates_uniqueness_of :url, message: "This feed has already been added."
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

  def author_name
    author.username
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
            if %w[title author summary content image].include?(key)
              value = Sanitize.fragment(value, SANITIZATION_OPTIONS)
            end
            [key, value.to_s] 
          end
        end.to_h
      end
    end
  end

  private
  def parsable
    begin
      parsed_feed_data = Feedjira::Feed.fetch_and_parse url
    rescue Feedjira::NoParserAvailable 
      unless url =~ /\/rss\/?$/ || url =~ /\.xml\/?$/
        self.url = self.url + (url[-1] == "/" ? "rss" : "/rss")
        retry
      end
      errors.add(:feed, FEED_ERRORS[:no_parser])
    rescue NoMethodError
      errors.add(:feed, FEED_ERRORS[:fetch_failure])
    rescue URI::InvalidURIError 
      errors.add(:feed, FEED_ERRORS[:fetch_failure])
    rescue Feedjira::FetchFailure
      errors.add(:feed, FEED_ERRORS[:fetch_failure])
    else 
      self.title = parsed_feed_data.title.to_s.sanitize 
      attempt_regexp_title if (title == "" || title =~ /^http/)
      self.description = parsed_feed_data.description.to_s.sanitize
    end
  end 

  def attempt_regexp_title
    self.title = url.match(/\/\/(w{3}\.)?(.+?)\.(tumblr|com|co|net|org)/)[2]
  rescue NoMethodError
    self.title = url 
  end

  def generate_topics
    feed_topics = Hash.new { |h, k| h[k] = 0 }
    entries.each do |entry|
      return unless entry['categories']
      JSON.parse(entry['categories']).each do |topic|
        feed_topics[topic] += 1
      end
    end

    feed_topics.keys.sort_by {|k| -feed_topics[k] }[0..4].each do |hot_topic|
      topic = Topic.find_by_title(hot_topic.downcase)
      topic = Topic.create(title: hot_topic.downcase) unless topic
      FeedTopic.create(feed_id: id, topic_id: topic.id)
    end
  end
end