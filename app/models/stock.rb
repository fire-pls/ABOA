class Stock < ApplicationRecord
  belongs_to :category
  has_many :items

  validates_uniqueness_of :name, :description, presence: true

  def available_items(size)
    self.items.where(size:size,order_id:nil)
  end
end
