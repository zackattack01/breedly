class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by_credentials(user_params[:username], user_params[:password])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def logout
    @current_user.reset_session_token!
    session[:session_token] = nil
  end

  private
  def user_params
    params.require(:user).permit(:username, :real_name, :password, :age, :age_range)
  end  
end
