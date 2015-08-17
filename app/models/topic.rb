class Topic < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true
  
  has_many :feed_topics
  has_many :feeds, through: :feed_topics
end
