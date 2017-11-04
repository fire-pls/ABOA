class Order < ApplicationRecord
  belongs_to :user
  has_many :items

  validates_uniqueness_of :items
end
