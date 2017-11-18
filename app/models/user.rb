class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_one :cart, dependent: :destroy
  has_many :orders, dependent: :destroy
  has_many :reservations, through: :cart
  has_many :items, through: :orders
  after_create :create_cart
  before_save :confirm_admin

  #before_save :geocode

  private
  def create_cart
    self.cart = Cart.new
  end

  def confirm_admin
    self.admin = ENV['ADMIN_EMAIL'] == self.email
  end
end
