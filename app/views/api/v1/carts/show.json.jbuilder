json.out_of_stock do
  json.array! @out_of_stock
end
json.items @cart.items do |item|
  json.extract! item, :id
  json.extract! item.stock, :name, :description
  json.extract! item, :size, :quantity_left, :order_id
end
