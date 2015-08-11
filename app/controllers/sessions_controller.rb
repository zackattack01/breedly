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
    @user = current_user.id
    logout
    redirect_to new_session_url
  end
end
