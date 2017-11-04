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
  has_one :category, through: :stock

  validates :size, inclusion: { in: SIZES }
end
