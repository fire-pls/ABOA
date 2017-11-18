class PagesController < ApplicationController
  #acts_as_token_authentication_handler_for User
  skip_before_action :authenticate_user!, only: [ :home ]
  #before_action :set_payment

  #reverse the commentation if you wish to test stripe checkout on root path


  def home
  end

  private

  def set_payment
    @order = Order.first
    authorize @order # For Pundit
  end
end
