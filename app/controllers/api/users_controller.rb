class Api::UsersController < ApplicationController
  def show
    @user = current_user
  end

  def update
    @user = current_user
    if @user.username == "Guest"
      render :json => ["You're a guest!  Feel free to make an account and update away"], status: 422
    elsif @user.update(user_params)
      render 'show'
    else
      render :json => @user.errors.full_messages, status: 422
    end
  end
  
  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render 'show'
  end
end