class Api::V1::StocksController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  before_action :set_stock, only: [ :show, :update, :destroy ]

  def index
    @stocks = policy_scope(Stock).where(category:Category.find_by(name:params[:category_name]))
    if @stocks == []
      render json:
        { errors: "#{params[:category_name]} has no stock yet" },
        status: :unprocessable_entity
    end
  end

  def show
  end

  def create
    @stock = Stock.new(stock_params)
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
    params.require(:stock).permit(:name, :description, :category_id)
  end

  def render_error
    render json: { errors: @stock.errors.full_messages },
      status: :unprocessable_entity
  end
end
