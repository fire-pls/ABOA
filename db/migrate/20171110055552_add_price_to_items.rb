class AddPriceToItems < ActiveRecord::Migration[5.1]
  def change
    add_monetize :items, :price, currency: { present: false }
  end
end
