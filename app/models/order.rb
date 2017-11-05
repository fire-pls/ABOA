class Order < ApplicationRecord
  belongs_to :user
  has_many :items

  validates :address, presence: true
  validates :zip_code, presence: true
  validates :city, presence: true
  validates :country, presence: true

  geocoded_by :full_address
  after_validation :geocode, if: :full_address_changed?
  #validates_associated :items
  validate :has_items, on: :create
  validate :has_no_order_id, on: :create

  def full_address
    "#{address}, #{city}, #{zip_code} #{ISO3166::Country[country].name}"
  end

  def full_address_changed?
    address_changed? || zip_code_changed? || city_changed? || country_changed?
  end

  private
  def has_items
    errors.add(:base, 'Order has no items') if self.items == []
  end
  def has_no_order_id
    errors.add(:base, 'Cart includes items which may be out of stock. Update quantity accordingly.') if self.items.where(:order_id => !nil).any?
  end
end
