class Item < ApplicationRecord
  SIZES = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "Fits all"
  ]
  belongs_to :stock
  belongs_to :order, optional: true
  has_one :category, through: :stock

  validates :size, inclusion: { in: SIZES }
  validate :order_is_unique, on: :update


  def quantity_left
    return list_of_available.count
  end

  def first_available
    list_of_available.first
  end

  private
  def list_of_available
    return Item.where(stock:self.stock,size:self.size,order_id:nil)
  end

  def order_is_unique
    errors.add(:order_id, "Item has already been ordered.") unless self.order_id_was == nil
  end
end
