Rails.application.routes.draw do
  root to: 'site#root'
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:show, :update, :destroy] do 
      resources :user_topics, only: :index
    end
    resources :feeds, except: [:new, :update] do 
      resources :feed_topics, only: [:create, :index]
    end
    resources :user_topics, only: [:create, :destroy]
    resources :feed_topics, only: [:show, :destroy]
    resources :topics, only: [:create, :destroy, :show, :index]
    resources :subscriptions
  end
end