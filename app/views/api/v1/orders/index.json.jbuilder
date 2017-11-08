json.array! @orders do |order|
  json.extract! order, :id, :user_id, :full_address, :created_at, :paid, :shipped, :delivered, :shipping_company
  json.items order.items do |item|
    json.extract! item, :stock_id, :size
    json.extract! item.stock, :name
  end
end
