class Order < ApplicationRecord
  belongs_to :user
  has_many :items

  validates :address, presence: true
  validates :zip_code, presence: true
  validates :city, presence: true
  validates :country, presence: true

  geocoded_by :full_address
  after_validation :geocode, if: :full_address_changed?

  def full_address
    "#{address}, #{city} #{ISO3166::Country[country].name}, #{zip_code}"
  end

  def full_address_changed?
    address_changed? || zip_code_changed? || city_changed? || country_changed?
  end
end
