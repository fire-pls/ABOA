class Stock < ApplicationRecord
  belongs_to :category
  has_many :items

  validates_uniqueness_of :name, :description, presence: true

  def first_available_item(size)
    self.items.where(size:size,order_id:nil).first
  end
end
