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

  private

  def order_is_unique
    errors.add(:order_id, "item has already been ordered") if self.order_id_changed?
    binding.pry
  end
end
