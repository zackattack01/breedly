class SessionController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      login(@user)
      redirect_to '/'
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def destroy
    @user = User.find(params[:id])
    logout
    ### ehhh
    redirect_to '/'
  end
end
