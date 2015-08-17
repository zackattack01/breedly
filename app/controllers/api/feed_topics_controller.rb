class Api::FeedTopicsController < ApplicationController
  def create
    @feed_topic = FeedTopic.new(feed_topic_params)
    if @feed_topic.save
      render 'show'
    else
      render :json => @feed_topic.errors.full_messages
    end
  end

  private
  def feed_topic_params
    params.require(:feed_topic).permit(:feed_id, :topic_id)
  end
end