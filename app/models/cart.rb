class Cart < ApplicationRecord
  belongs_to :user
  has_many :reservations, dependent: :destroy
  has_many :items, through: :reservations
  validates_associated :reservations
  validate :size_still_in_stock

  def add_quantity_and_size(qty, size, stock)
    stock_left = stock.available_items(size)
    size_count = stock_left.count
    if size_count == 0
      errors.add(:base, "There are no articles left of this size.")
    elsif size_count < qty
      errors.add(:base, "There are only #{size_count} articles left of this size.")
    else
      qty.times { |i| Reservation.create(cart:self,item:stock_left[i]) }
    end
  end

  def checkout
    ord = Order.new(user: self.user, address: '1016 E San Antonio Drive', zip_code: '90807', country:'US', city:'Long Beach')
    self.items.each { |item| ord.items << item }
    ord.save
  end

  private
  def size_still_in_stock
    stocks = {}
    self.items.pluck(:stock_id, :size).each do |arr_item|
      key = arr_item[0]
      if stocks.has_key?(key)
        stocks[key] << arr_item[1]
      else
        stocks[key] = [arr_item[1]]
      end
    end
    stocks.each do |k,v|
      #k is stock id
      stock = Stock.find(k)
      duplicates = v.group_by{|size| size}
      duplicates.each do |size,arr|
        desired = arr.count
        available = stock.items.where(order_id:nil,size:size)
        qty_left = available.count
        binding.pry
        if qty_left == 0
          errors.add(:base, "There are no #{size} #{stock.name}s left.")
        elsif qty_left < desired
          errors.add(:base, "There are only #{qty_left} #{size} #{stock.name}s left. You tried to purchase #{desired}.")
        else
          self.reservations.where(stock:stock, size:size).each do |res|
            res.update(item:available[i])
          end
        end
      end
    end
  end
end
      # item = res.item
      # stock = item.stock
      # if item.order_id != nil
      #   stock_left = item.stock.available_items(item.size)
      #   if stock_left == 0
      #     errors.add(:base, "There are no more #{item.size} #{stock.name}s left.")
      #   else
      #     get_next_available(item)
      #   end
      # end
