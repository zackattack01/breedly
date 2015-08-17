class MoveDescriptionFromTopicsToFeeds < ActiveRecord::Migration
  def change
    add_column :feeds, :description, :string
    remove_column :topics, :description
  end
end
