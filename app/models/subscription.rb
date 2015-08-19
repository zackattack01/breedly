class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :feed
  validates :user, :feed, presence: true
  validates_uniqueness_of :feed_id, :scope => :user_id, message: "You're already interested in this feed."
end