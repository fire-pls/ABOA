class Api::V1::OrdersController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User
  before_action :set_order, only: [ :show, :update, :destroy ]

  def index
    @orders = policy_scope(Order)
  end

  def show
  end

  def update
    if @order.update(order_params)
      render :show
    else
      render_error
    end
  end

  def destroy
    @order.destroy
    head :no_content
  end

  private

  def set_order
    @order = Order.where(paid:true).find(params[:id])
    authorize @order  # For Pundit
  end

  def order_params
    if current_user.admin
      #admin can edit all info
      params.require(:order).permit(:city, :address, :zip_code, :country, :paid, :delivered, :shipped, :shipping_company)
    else
      #user who created it should only be able to update address
      params.require(:order).permit(:city, :address, :zip_code, :country)
    end
  end

  def render_error
    render json: { errors: @order.errors.full_messages },
      status: :unprocessable_entity
  end
end
