class Api::V1::StocksController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User
  before_action :set_stock, only: [ :show, :update, :destroy ]

  def index
    @stocks = policy_scope(Stock)
  end

  def show
  end

  def create
  end

  def update
    if @stock.update(stock_params)
      render :show
    else
      render_error
    end
  end

  def destroy
    @stock.destroy
    head :no_content
  end

  private

  def set_stock
    @stock = Stock.find(params[:id])
    authorize @stock  # For Pundit
  end

  def stock_params
    params.require(:stock).permit(:name, :description)
  end

  def render_error
    render json: { errors: @stock.errors.full_messages },
      status: :unprocessable_entity
  end
end
