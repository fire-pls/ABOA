class Stock < ApplicationRecord
  belongs_to :category
  has_many :items

  validates :name, :description, presence: true
end
