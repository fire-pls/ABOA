class Stock < ApplicationRecord
  belongs_to :category
  has_many :items
  has_attachments :photos, maximum: 10

  validates_uniqueness_of :name, presence: true
  validates :description, presence: true
  validates :base_price, presence: true

  def available_items(size)
    self.items.where(size:size,order_id:nil)
  end

  def price
    Monetize.parse(self.base_price)
  end

  def price_formatted
    Monetize.parse(self.base_price).format
  end

  def sizes
    self.items.pluck(:size).uniq
  end

  def quantity_of_size(size)
    items_of_size(size).count
  end

  def quantity_left_of_size(size)
    items_of_size(size).where(order_id:nil).count
  end

  def available_sizes
    self.items.where(order_id:nil).pluck(:size).uniq
  end

  def quantity_left
    self.items.where(order_id:nil).count
  end

  private
  def items_of_size(size)
    self.items.where(size:size)
  end
end
