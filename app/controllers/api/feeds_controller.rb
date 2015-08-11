class Api::FeedsController < ApplicationController
  def create
    @feed = Feed.new(feed_params)
    if @feed.save
      render 'show'
    else
      render json: { error: "Invalid feed url" }, status: 422
    end
  end

  def update
    @feed = Feed.find(params[:id])
    if @feed.update(feed_params)
      render 'show'
    else
      render json: { error: "Invalid feed url" }, status: 422
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
