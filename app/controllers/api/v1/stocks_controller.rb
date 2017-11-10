class Api::V1::StocksController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [ :index, :show ]
  before_action :set_stock, only: [ :show, :update, :destroy ]

  def index
    @category = Category.find_by(name:params[:category_name])
    if @category == nil
      @stocks = policy_scope(Stock)
      render json:
        { errors: "The category #{params[:category_name]} does not exist." },
        status: :unprocessable_entity
    else
      @stocks = policy_scope(Stock).where(category:@category)
      if @stocks == []
        render json:
          { errors: "#{params[:category_name]} has no stock yet" },
          status: :unprocessable_entity
      end
    end
  end

  def show
    binding.pry
  end

  def create
    @category = Category.find_by(name:params[:category_name])
    @stock = Stock.new(stock_params.except(:sizes))
    @stock.category = @category
    authorize @stock
    if @stock.save
      add_items_if_needed
      render :show
    else
      render_error
    end
  end

  def update
    binding.pry
    if @stock.update(stock_params.except(:sizes))
      add_items_if_needed
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
    @category = Category.find_by(name:params[:category_name])
    @stock = Stock.find(params[:id])
    if @stock.category == @category
      authorize @stock # For Pundit
    else
      render json: { errors: "No stock with id #{@stock.id} found for category #{@category.name}" }
    end
  end

  def stock_params
    permitted = params.require(:stock).permit(:name, :description, :category_id, :photos, :sizes => {})#, photos: photo_params)
  end

  def add_items_if_needed
    @sizes = stock_params[:sizes]
    unless @sizes.nil?
      @sizes.each { |k,v| v.times { Item.create(stock:@stock, size:k) } } unless @sizes.empty?
    end
  end

  def add_photos_if_needed
    @photos = stock_params[:photos]
    unless @photos.nil?
      @photos.each { || } unless @photos.empty?
    end
  end

  def photo_params
    [:public_id, :version, :signature, :width, :height, :format, :resource_type, :created_at, :bytes, :type, :etag, :placeholder, :url, :secure_url, :original_filename]
  end

  def render_error
    render json: { errors: @stock.errors.full_messages },
      status: :unprocessable_entity
  end
end
