class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user
      login(@user)
      redirect_to '/'
    else
      flash.now[:errors] = ["Invalid login credentials"]
      render 'new'
    end
  end

  def destroy
    if current_user
      logout 
      render :json => "Logout successful." 
    else
      render :json => "You are already logged out.", status: 422
    end
  end
end
