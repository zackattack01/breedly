class CreateFeedTopics < ActiveRecord::Migration
  def change
    create_table :feed_topics do |t|
      t.references :feed, index: true, foreign_key: true, null: false
      t.references :topic, index: true, foreign_key: true, null: false

      t.timestamps null: false
    end
  end
end
