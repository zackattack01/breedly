class User < ActiveRecord::Base
  validates :username, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password

  has_many :personal_feeds, foreign_key: :user_id, class_name: 'Feed', dependent: :destroy
  
  has_many :user_topics, dependent: :destroy
  has_many :topics, through: :user_topics
  
  has_many :feed_topics, through: :topics
  has_many :feeds, through: :feed_topics

  has_many :subscriptions, dependent: :destroy
  has_many :subscribed_feeds, through: :subscriptions, source: :feed

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest) == password
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
  end
  
  def sorted_feeds
    feeds.includes(:topics)
  end
  
  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end