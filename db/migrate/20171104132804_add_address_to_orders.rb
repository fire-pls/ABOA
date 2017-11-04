class AddAddressToOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :address, :string
    add_column :orders, :zip_code, :string
    add_column :orders, :city, :string
    add_column :orders, :country, :string
    add_column :orders, :lat, :float
    add_column :orders, :lng, :float
  end
end
