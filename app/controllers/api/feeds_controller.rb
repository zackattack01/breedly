class Api::FeedsController < ApplicationController
  def create
    if current_user.nil?
      render json: "You must be signed in to add a feed", status: 422
    else
      @feed = Feed.generate_feed_object(feed_params[:url], current_user.id)
      if @feed.save
        render 'show'
      else
        render json: @feed.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    feed = Feed.find(params[:id])
    feed.destroy
    render 'show'
  end 

  ##ADD INCLUDES
  def show
    @feed = Feed.includes(:topics).find(params[:id])
  end

  def index
    @feeds = current_user.sorted_feeds
  end

  private
  def feed_params
    params.require(:feed).permit(:url)
  end
end