class AddTitleToFeeds < ActiveRecord::Migration
  def change
    add_column :feeds, :title, :string, index: true
  end
end
