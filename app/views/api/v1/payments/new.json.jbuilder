json.extract! @order, :id, :full_address, :latitude, :longitude, :amount, :amount_cents
json.items @order.items do |item|
  json.extract! item, :title, :price_formatted
end
