Rails.application.routes.draw do
  root to: 'site#root'
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:show, :update, :destroy]
    resources :feeds, except: [:new, :update] do 
      resources :feed_topics, only: [:create, :index]
    end
    resources :feed_topics, only: [:show, :destroy]
    resources :topics, only: [:create, :destroy, :show, :index] 
  end
end