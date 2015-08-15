class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :title, index: true, null: false
      t.string :description

      t.timestamps null: false
    end
  end
end
