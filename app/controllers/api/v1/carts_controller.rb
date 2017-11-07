class Api::V1::CartsController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User
  before_action :set_cart, only: [ :show, :update ]

  def show
  end

  def update
    if @cart.update(cart_params)
      render :show
    else
      render_error
    end
  end

  private

  def set_cart
    @cart = current_user.cart
    authorize @cart  # For Pundit
  end

  def cart_params
    params.require(:cart).permit(:size, :qty, :stock_id)
  end

  def render_error
    render json: { errors: "You cannot view this cart" },
      status: :unprocessable_entity
  end
end
