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
  validates :order, presence: true, uniqueness: { scope: :order_id }
end
