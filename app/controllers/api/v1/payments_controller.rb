class Api::V1::PaymentsController < Api::V1::BaseController
  #acts_as_token_authentication_handler_for User
  before_action :set_payment

  def new
  end

  def create
    customer = Stripe::Customer.create(
      source: params[:stripeToken],
      email:  params[:stripeEmail]
    )

    charge = Stripe::Charge.create(
      customer:     customer.id,   # You should store this customer id and re-use it.
      amount:       @order.amount_cents,
      description:  "Payment for order number: #{@order.id} containing #{@order.items.count} items",
      currency:     @order.amount.currency
    )

    @order.update(payment: charge.to_json, paid: true)
    redirect_to api_v1_order_path(@order)

  rescue Stripe::CardError => e
    flash[:alert] = e.message
    redirect_to new_order_payment_path(@order)
  end

  private

  def set_payment
    @order = Order.where(paid: false).find(params[:order_id])
    authorize @order # For Pundit
  end

  def render_error
    render json: { errors: @payment.errors.full_messages },
      status: :unprocessable_entity
  end
end
