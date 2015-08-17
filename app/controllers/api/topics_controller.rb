class Api::TopicsController < ApplicationController
  def create 
    @topic = Topic.new(topic_params)
    if @topic.save
      render 'show'
    else
      render :json => @topic.errors.full_messages, status: 422
    end
  end

  def show
    @topic = Topic.find(params[:id])
  end

  def index 
    @topics = Topic.all
  end

  private
  def topic_params
    params.require(:topic).permit(:title)
  end
end