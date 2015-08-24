class Api::FeedsController < ApplicationController
  def create
    if current_user.nil?
      render json: "You must be signed in to add a feed", status: 422
    else
      user_id = feed_params[:public] ? 1 : current_user.id
      @feed = Feed.generate_feed_object(feed_params[:url], user_id)
      if @feed.save
        render 'show'
      else
        render json: @feed.errors, status: 422
      end
    end
  end

  def destroy
    feed = Feed.find(params[:id])
    feed.destroy
    render :json => "feed destroyed."
  end 

  def show
    @feed = Feed.includes(:topics, :subscriptions, :author).find(params[:id])
    if logged_in?
      subscription = @feed.subscriptions.find_by_user_id(current_user.id)
      if subscription
        @subscribed_id = subscription.id
      end
    end
  end

  def index
    if params[:query]
      case 
      when params[:query] == "all"
        @feeds = Feed.all
        render 'search_by_title'
      when params[:query] == "public"
        @feeds = Feed.public_feeds.includes(:topics)
      when params[:query] == "subscribed"
        @feeds = current_user.subscribed_feeds.includes(:topics)
      when params[:query] == "sorted"
        @feeds = current_user.sorted_feeds.group("feeds.id").order("COUNT(feeds.id) DESC")
      when params[:query] =~ /^topics=/
        topics = JSON.parse(params[:query].match(/^topics=(.+)$/)[1])
        @feeds = Topic.includes(:feeds).where({ title: topics }).map do |topic|
          topic.feeds
        end.flatten
        @subscriptions = Subscription.where({ user_id: current_user.id })
      else
        raise "query probz"
      end
    else
      @feeds = Feed.all
    end
  end

  private
  def feed_params
    params.require(:feed).permit(:url, :public)
  end
end