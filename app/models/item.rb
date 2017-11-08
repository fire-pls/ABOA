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

  def list_of_available
    return Item.where(stock:self.stock,size:self.size,order_id:nil)
  end

  def self.return_available_items(array_of_old)
    final = {none:[], available:{less:{},more:{}}}
    stocks = {}
    array_of_old.pluck(:stock_id, :size).each do |arr|
      key = arr[0]
      stocks.has_key?(key) ? stocks[key] << arr[1] : stocks[key] = [arr[1]]
    end
    stocks.each do |k,v|
      stock = Stock.find(k)
      duplicates = v.group_by{|size| size}
      duplicates.each do |size, arr|
        desired = arr.count
        available = stock.items.where(order_id:nil,size:size)
        qty_left = available.count
        if qty_left == 0
          final[:none] << [stock.id,size]
        elsif qty_left < desired
          final[:available][:less][stock.id] = []
          qty_left.times { |i| final[:available][:less][stock.id] << available[i] }
        else
          final[:available][:more][stock.id] = []
          desired.times { |i| final[:available][:more][stock.id] << available[i] }
        end
      end
    end
    return final
  end

  private
  def order_is_unique
    errors.add(:order_id, "Item has already been ordered.") unless self.order_id_was == nil
  end
end
