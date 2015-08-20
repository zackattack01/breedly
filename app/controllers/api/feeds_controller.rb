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

  def show
    @feed = Feed.includes(:topics, :subscriptions).find(params[:id])
    if logged_in?
      subscription = @feed.subscriptions.find_by_user_id(current_user.id)
      if subscription
        @subscribed_id = subscription.id
      end
    end
  end

  def index
    if params[:query]
      case params[:query]
      when "all"
        @feeds = Feed.all
        render 'search_by_title'
      when "public"
        @feeds = Feed.public_feeds
        render 'index'
      when "subscriptions"
        @feeds = current_user.subscribed_feeds
        render 'index'
      else
        raise "query probz"
      end
    else
      @feeds = current_user.sorted_feeds.group("feeds.id").order("COUNT(feeds.id) DESC")
    end
  end

  private
  def feed_params
    params.require(:feed).permit(:url)
  end
end