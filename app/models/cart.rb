class Cart < ApplicationRecord
  belongs_to :user
  has_many :reservations, dependent: :destroy
  validate :stock_left, on: :update

  def reserve_item(stock, size)
    Reservation.create(cart:self,item:stock.first_available_item(size))
  end

  def checkout

  end

  private
  def stock_left
    self.reservations.each do |res|
      orig_itm = res.item
      if orig_itm.order_id != nil
        stock = orig_itm.stock
        new_item = stock.first_available_item(orig_itm.size)
        new_item == nil ? res.destroy : res.update(item:new_item)
      end
    end
  end

  def check_reservations

  end
end
