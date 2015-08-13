Rails.application.routes.draw do
  root to: 'site#root'
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:show, :update, :destroy]
    resources :feeds, except: [:new, :update]
  end
end


##TODO
# remove feed_url from the user model
# feeds should have_many attrs through: users
