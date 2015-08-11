class Api::UsersController < ApplicationController
  def create
    @user = user.new(user_params)
    if @user.save
      login(@user)
      redirect_to '/'
    else
      render :json => @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render :show
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else

      ## starting point
      render :json => @user.errors, status: :unprocessable_entity
    end
  end
end