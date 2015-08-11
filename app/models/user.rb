class User < ActiveRecord::Base
  validates :username, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
end
