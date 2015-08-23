class AddOrdToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :ord, :integer
  end
end
