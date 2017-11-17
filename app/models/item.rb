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
  monetize :price_cents

  validates :size, inclusion: { in: SIZES }
  validate :order_is_unique, on: :update
  validate :has_title
  validate :has_price


  def quantity_left
    return list_of_available.count
  end

  def price_formatted
    Monetize.parse(self.price).format
  end

  def list_of_available
    return Item.where(stock:self.stock,size:self.size,order_id:nil)
  end

  def self.return_available_items(array_of_old)
    final = {none:[], available:{}}
    stocks = {}
    array_of_old.pluck(:stock_id, :size, :id).each do |arr|
      key = arr[0]
      stocks.has_key?(key) ? stocks[key] << [arr[1],arr[2]] : stocks[key] = [[arr[1],arr[2]]]
    end
    stocks.each do |k,v|
      stock = Stock.find(k)
      duplicates = v.group_by{|x,y| x}
      #hash of "size"=>[["size", id],["size", id]]
      duplicates.each do |size, arr_arr|
        desired = arr_arr.count
        available = stock.items.where(order_id:nil,size:size).pluck(:id)
        qty_left = available.count
        if qty_left == 0
          #group == ['size',id]
          arr_arr.each { |group| final[:none] << group.last }
        else qty_left < desired
          #make hash of stock_id=>{orig_item_id: avail_item_id}
          final[:available][stock.id] = {} unless final[:available].has_key?(stock.id)
          arr_arr.each_with_index { |arr, i| final[:available][stock.id][arr.last] = available[i] }
        end
      end
    end
    return final
  end

  private
  def order_is_unique
    errors.add(:order_id, "Item has already been ordered.") unless self.order_id_was == nil
  end

  def has_title
    self.title = "#{self.stock.name}, size: #{self.size}" if self.title == nil
  end

  def has_price
    self.price = self.stock.base_price if self.price_cents == 0
  end
end
