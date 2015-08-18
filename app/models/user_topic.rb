class UserTopic < ActiveRecord::Base
  belongs_to :user
  belongs_to :topic
  validates :user, :topic, presence: true
  validates_uniqueness_of :topic_id, :scope => :user_id, message: "You're already interested in this topic."
end
