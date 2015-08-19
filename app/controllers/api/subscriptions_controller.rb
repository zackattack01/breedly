class Api::SubscriptionsController < ApplicationController
  def create
    @subscription = Subscription.new(subscription_params)
    if current_user
      @subscription.user_id = current_user.id 
      if @subscription.save
        render 'show'
      else  
        render :json => @subscription.errors.full_messages, status: 422
      end
    else
      render :json => "You must be logged in to subscribe to a feed.", status: 422
    end
  end

  def index
    @subscriptions = current_user.subscriptions
  end

  private
  def subscription_params
    params.require(:subscription).permit(:feed_id)
  end
end
