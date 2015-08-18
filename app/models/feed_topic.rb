class FeedTopic < ActiveRecord::Base
  belongs_to :feed
  belongs_to :topic
  validates :feed, :topic, presence: true
  validates_uniqueness_of :feed_id, :scope => :topic_id, message: "This feed already has that topic."
end