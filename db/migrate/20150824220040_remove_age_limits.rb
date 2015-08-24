class RemoveAgeLimits < ActiveRecord::Migration
  def change
    remove_column :users, :age_min
    remove_column :users, :age_max
  end
end
