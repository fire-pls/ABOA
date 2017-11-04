class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_one :cart, dependent: :destroy
  has_many :orders, dependent: :destroy
  has_many :reservations, through: :cart
  has_many :items, through: :orders
end
