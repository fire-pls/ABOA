class Api::V1::UsersController < Api::V1::BaseController
  acts_as_token_authentication_handler_for User#, only: [ :show ]
  skip_after_action :verify_authorized, only: [ :show ]

  def show
    @user = current_user
    render json: { token: @user.authentication_token, admin: @user.admin }
  end
end
