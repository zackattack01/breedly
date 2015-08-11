class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :password_digest
      t.string :username
      t.string :real_name
      t.integer :age
      t.integer :age_range
      t.string :session_token
      t.string :feed_url

      t.timestamps null: false
    end
    add_index :users, :username
  end
end
