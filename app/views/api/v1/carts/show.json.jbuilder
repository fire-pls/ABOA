json.items @cart.items do |item|
  json.extract! item, :id
  json.extract! item.stock, :name, :description
  json.extract! item, :size, :order_id
end
