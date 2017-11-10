Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  mount Attachinary::Engine => "/attachinary"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :orders, only: [ :index, :show, :update ] do
        resources :payments, only: [:new, :create]
      end
      # get the order details on this page, post it to /cart/checkout
      #get '/orderdetails', to: 'orders#new'
      get '/cart/', to: 'carts#show', as: 'cart'
      patch '/cart/', to: 'carts#update'
      put '/cart/', to: 'carts#update'
      post '/cart/checkout/', to: 'carts#checkout', as: 'checkout'
      #route all items inside category
      resources :categories, only: [ :index, :create ]
      resources :categories, path: '/c/', param: :name, only: [ :show, :update, :destroy ] do
        resources :stocks, path: '', except: [ :new, :edit ]
      end
    end
  end
end
