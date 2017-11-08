class Reservation < ApplicationRecord
  belongs_to :item
  belongs_to :cart
  has_one :stock, through: :item
  has_one :size, through: :item

  validate :item_not_ordered


  private
  def get_next_available(item)
    Item.where(size:item.size,stock:item.stock,order_id:nil).first
  end

  def item_not_ordered
    item = self.item
    if item.order_id != nil
      save = get_next_available(item)
      save == nil ? errors.add(:item_id, "Size #{item.size} has run out of stock.") : self.update(item:save)
    end
  end
end
