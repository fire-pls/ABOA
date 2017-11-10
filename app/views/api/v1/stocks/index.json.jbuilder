json.array! @stocks do |stock|
  json.extract! stock, :id, :name, :price_formatted
#  json.available_sizes do
#    json.array! stock.available_sizes
#  end
  json.extract! stock, :quantity_left
  json.extract! stock, :available_sizes
end
