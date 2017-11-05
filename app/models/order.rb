class Order < ApplicationRecord
  belongs_to :user
  has_many :items

  validates :address, presence: true
  validates :zip_code, presence: true
  validates :city, presence: true
  validates :country, presence: true

  geocoded_by :full_address
  after_validation :geocode, if: :full_address_changed?
  validates :items, presence: true
  validates_associated :items
  validate :has_no_order_id, on: :create

  def full_address
    "#{address}, #{city}, #{zip_code} #{ISO3166::Country[country].name}"
  end

  def full_address_changed?
    address_changed? || zip_code_changed? || city_changed? || country_changed?
  end

  private
  def has_no_order_id
    errors.add(:base, 'Cart includes items which may be out of stock. Please reload page.') if self.items.where(:order_id => !nil).any?
  end
end
