class Api::FeedsController < ApplicationController
  def create
    @feed = Feed.generate_feed_object(feed_params[:url], current_user.id)
    if @feed && @feed.save
      render 'show'
    else
      render json: @feed.errors.full_messages, status: 422
    end
  end

  def update
    @feed = Feed.find(params[:id])
    updated_feed = Feed.generate_feed_object(feed_params[:url], current_user.id)
    if updated_feed
      @feed.destroy
      @feed = updated_feed
      render 'show'
    else
      render json: { error: Feed::FEED_ERRORS[:no_update] }, status: 422
    end
  end

  def destroy
    feed = Feed.find(params[:id])
    feed.destroy
    render 'show'
  end 

  def show
    @feed = Feed.find(params[:id])
  end

  def index
    #eventually-> @feeds = current_user.sorted_feeds
    @feeds = Feed.all
  end

  private
  def feed_params
    params.require(:feed).permit(:url)
  end
end