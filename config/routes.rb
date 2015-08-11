Rails.application.routes.draw do
  resources :users, only: :new
  resource :session, only: [:create, :update, :destroy]

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:show, :update, :create, :destroy]
    

  end
end
