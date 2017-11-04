class Category < ApplicationRecord
  has_many :stocks
  has_many :items, through: :stocks

  validates_uniqueness_of :name, case_sensitive: false
end
