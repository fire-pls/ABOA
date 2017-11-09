json.extract! @order, :id, :full_address, :latitude, :longitude, :shipped, :paid, :delivered, :shipping_company
json.items @order.items do |item|
  json.extract! item, :title, :id, :size, :order_id
  json.extract! item.stock, :name, :description
end
