class User < ActiveRecord::Base
  validates :username, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password

  has_many :feeds

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

  # def to_json
  #   {
  #     :id => id,
  #     :username => username,
  #     :real_name => real_name, 
  #     :age => age,
  #     :age_range => age_range, 
  #     :feed_url => feed_url
  #   }.to_json
  # end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end