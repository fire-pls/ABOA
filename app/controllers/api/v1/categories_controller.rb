class Api::V1::CategoriesController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User, except: [ :index ]
  before_action :set_category, only: [ :update, :destroy ]

  def index
    @categories = policy_scope(Category)
  end

  def create
  end

  def update
    if @category.update(category_params)
      render :show
    else
      render_error
    end
  end

  def destroy
    @category.destroy
    head :no_content
  end

  private

  def set_category
    @category = category.find_by(params[:name])
    authorize @category  # For Pundit
  end

  def category_params
    params.require(:category).permit(:name)
  end

  def render_error
    render json: { errors: @category.errors.full_messages },
      status: :unprocessable_entity
  end
end
