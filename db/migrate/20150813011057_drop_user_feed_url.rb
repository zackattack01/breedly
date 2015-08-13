class DropUserFeedUrl < ActiveRecord::Migration
  def change
    remove_column :users, :feed_url
  end
end
