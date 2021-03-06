class Api::V1::CartsController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User
  before_action :set_cart, only: [ :show, :update, :checkout ]

  def show
  end

  def update
    unless cart_params[:item_ids].nil?
      cart_params[:item_ids].each { |item_id| @cart.remove_item_by_id(item_id) }
      render :show
    else
      qty = cart_params[:qty]
      size = cart_params[:size]
      stock_id = cart_params[:stock_id]
      if cart_params[:remove]
        delete = @cart.items.where(stock_id:stock_id,size:size).pluck(:id)
        delete.each { |item_id| @cart.reservations.find_by(item_id:item_id).destroy }
        render :show
      elsif qty < 0
        @cart.remove_quantity(qty,size,stock_id)
        render :show
      elsif qty > 0
        @cart.add_quantity_and_size(qty,size,stock_id)
        render :show
      else
        render_error
      end
    end
  end

  def checkout
    order = Order.new(order_params)
    order.user = current_user
    sum = nil
    @cart.items.each { |item| sum.nil? ? sum = item.price : sum += item.price }
    order.amount = sum
    ord = @cart.checkout(order)
    if ord == false
      render_error
    else
      #redirect_to new_api_v1_payment_path(ord)
      #redirect_to new_api_v1_order_payment_path(ord, current_user: current_user) and return
      @order = ord
      render 'api/v1/payments/new'
    end
  end

  private

  def set_cart
    @cart = current_user.cart
    if @cart.items.where.not(order_id:nil).any?
      taken_items = @cart.items.where.not(order_id:nil)
      available_items = Item.return_available_items(taken_items)
      @out_of_stock = available_items[:none]
      available_items[:available].each do |stock_id,items_hash|
        items_hash.each do |old_id, new_id|
          reservation = @cart.reservations.find_by(item_id: old_id)
          new_id == nil ? @out_of_stock << old_id : reservation.update(item_id: new_id)
        end
      end
    end
    authorize @cart  # For Pundit
  end

  def cart_params
    params.require(:cart).permit(:size, :qty, :stock_id, :remove, item_ids: [])
  end

  def order_params
    params.require(:order).permit(:city, :address, :zip_code, :country)
  end

  def render_error
    render json: { errors: "You cannot update at this time." },
      status: :unprocessable_entity
  end
end
