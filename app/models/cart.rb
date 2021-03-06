class Cart < ApplicationRecord
  belongs_to :user
  has_many :reservations, dependent: :destroy
  has_many :items, through: :reservations
  validates_associated :reservations
  #validate :size_still_in_stock

  def remove_quantity(qty, size, stock_id)
    items = Item.where(size:size, stock_id:stock_id).pluck(:id)
    qty*(-1).times { |i| self.reservations.find_by(item_id:items[i]).destroy }
  end

  def remove_item_by_id(id)
    self.reservations.find_by(item_id:id).destroy
  end

  def add_quantity_and_size(qty, size, stock_id)
    stock = Stock.find(stock_id)
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

  def checkout(order)
    usr = self.user
    ord = order
    self.items.each { |item| ord.items << item }
    if ord.save
      self.empty!
      return ord
    else
      return false
    end

  end

  def empty!
    self.reservations.destroy_all
  end

  def force_checkout!
    size_still_in_stock {"force"}
    self.reload.checkout
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
        if qty_left == 0
          if block_given?
            self.items.where(stock:stock, size:size).each { |itm| Reservation.find_by(item_id: itm.id).destroy }
          else
            errors.add(:base, "There are no #{size} #{stock.name}s left.")
          end
        elsif qty_left < desired
          if block_given?
            self.items.where(stock:stock, size:size).each { |itm| Reservation.find_by(item_id: itm.id).destroy }
            qty_left.times { |i| Reservation.create(item:available[i], cart:self)}
          else
            errors.add(:base, "There are only #{qty_left} #{size} #{stock.name}s left. You tried to purchase #{desired}.")
          end
        else
          self.items.where(stock:stock, size:size).each_with_index do |itm,i|
            Reservation.find_by(item_id: itm.id).update(item:available[i])
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
