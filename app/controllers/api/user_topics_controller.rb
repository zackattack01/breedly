class Api::UserTopicsController < ApplicationController
  def create
    @user_topic = UserTopic.new(user_topic_params)
    @user_topic.user_id = current_user.id
    if @user_topic.save
      render 'show'
    else
      render :json => @user_topic.errors.full_messages, status: 422
    end
  end

  def index
    ##@user = User.find(params[:user_id])
    @user_topics = current_user.topics
  end

  private
  def user_topic_params
    params.require(:user_topic).permit(:topic_id)
  end
end
