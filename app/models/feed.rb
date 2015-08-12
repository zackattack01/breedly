class Feed < ActiveRecord::Base
  validates :user, :url, presence: true

  belongs_to :user

  def self.generate_feed_object

  end
end




