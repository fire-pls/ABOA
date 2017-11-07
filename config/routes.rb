Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :orders, only: [ :index, :show, :update, :create, :destroy ]
      get '/cart/', to: 'carts#show', as: 'cart'
      patch '/cart/', to: 'carts#update', as: 'update_cart'
      get '/cart/checkout/', to: 'carts#checkout', as: 'checkout'
      #route all items inside category
      resources :categories, only: [ :index, :new, :create ]
      resources :categories, path: '', param: :name, except: [ :index, :new, :create ] do
        get '/:id', to: 'stocks#show'
      end
    end
  end
end
