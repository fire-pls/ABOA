class Category < ApplicationRecord
  has_many :stocks
  has_many :items, through: :stocks
end
