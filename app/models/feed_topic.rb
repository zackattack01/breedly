class FeedTopic < ActiveRecord::Base
  belongs_to :feed
  belongs_to :topic
  validates :feed, :topic, presence: true
end