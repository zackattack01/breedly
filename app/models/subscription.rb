class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :feed
  validates :user, :feed, presence: true
  validates_uniqueness_of :feed_id, :scope => :user_id, message: "You're already subscribed to this feed."
  # after_initialize :give_initial_ord
  default_scope { order(:ord) }

  private
  def give_initial_ord
    self.ord ||= 0
  end 
end