Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :orders, only: [ :index, :show, :update ]
      # get the order details on this page, post it to /cart/checkout
      #get '/orderdetails', to: 'orders#new'
      get '/cart/', to: 'carts#show', as: 'cart'
      patch '/cart/', to: 'carts#update', as: 'update_cart'
      post '/cart/checkout/', to: 'carts#checkout', as: 'checkout'
      #route all items inside category
      resources :categories, except: [ :show ]
      resources :categories, path: '', param: :name, only: [ :show ] do
        resources :stocks, path: ''
      end
    end
  end
end
