class AddBasePriceToStock < ActiveRecord::Migration[5.1]
  def change
    add_column :stocks, :base_price, :integer
  end
end
