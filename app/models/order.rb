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

  def full_address
    "#{address}, #{city}, #{zip_code} #{ISO3166::Country[country].name}"
  end

  def full_address_changed?
    address_changed? || zip_code_changed? || city_changed? || country_changed?
  end

  private
  def has_items
    errors.add(:base, 'Needs items') unless self.items.any?
  end
end
