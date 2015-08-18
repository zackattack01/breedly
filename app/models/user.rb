class User < ActiveRecord::Base
  validates :username, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password

  has_many :feeds
  has_many :user_topics
  has_many :topics, through: :user_topics

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
  
  ## ask why this looks like shit anywhere but the rails console
  def sorted_feeds
    topics.includes(:feeds).map { |t| t.feeds }.sort_by do |f| 
      -f.length 
    end.flatten.uniq
  end
  
  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end


  ## todo
  # def generate_subscribed_feeds

  # end
end