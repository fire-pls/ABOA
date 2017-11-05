class AddStatusesToOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :paid, :boolean, default: false
    add_column :orders, :shipped, :boolean, default: false
    add_column :orders, :delivered, :boolean, default: false
    add_column :orders, :tracking_number, :string
    add_column :orders, :shipping_company, :string
  end
end
