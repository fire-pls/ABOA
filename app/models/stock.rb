class Stock < ApplicationRecord
  belongs_to :category
  has_many :items

  validates_uniqueness_of :name, :description, presence: true
end
