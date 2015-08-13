class ChangeAgeRangeToTwoValues < ActiveRecord::Migration
  def change
    remove_column :users, :age_range
    add_column :users, :age_min, :integer
    add_column :users, :age_max, :integer
  end
end
