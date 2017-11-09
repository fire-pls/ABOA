json.array! @stocks do |stock|
  json.extract! stock, :id, :name
  json.extract! stock.items.where(order_id:nil).count, :qty_left
end
