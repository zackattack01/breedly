class Topic < ActiveRecord::Base
  validates :title, presence: true
  validates :title, :uniqueness => {:case_sensitive => false}
  
  has_many :feed_topics
  has_many :feeds, through: :feed_topics

  has_many :user_topics
  has_many :users, through: :user_topics

  # default_scope { order(:title) }
end
