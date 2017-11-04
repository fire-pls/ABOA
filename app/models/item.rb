class Item < ApplicationRecord
  SIZES = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "Fits all"
  ]
  belongs_to :order

  validates :size, inclusion: { in: SIZES }
end
