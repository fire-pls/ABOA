class Api::V1::OrdersController < Api::V1::BaseController
   before_action :set_order, only: [ :show ]
  def index
    @orders = policy_scope(Order)
  end


  def show
  end

  private

  def set_order
    @order = Order.find(params[:id])
    authorize @order  # For Pundit
  end
end
