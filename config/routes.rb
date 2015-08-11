Rails.application.routes.draw do
  root to: 'site#root'
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:show, :update, :destroy]
    resources :feeds, except: :new
  end
end
