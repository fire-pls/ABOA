class Reservation < ApplicationRecord
  belongs_to :item
  belongs_to :cart

  def quantity_left
    item = self.item
    return Item.where(stock:item.stock,size:item.size,order_id:nil).count
  end
end
