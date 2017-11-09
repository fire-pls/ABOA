json.array! @categories do |category|
  json.extract! category, :name, :id
  json.article_count category.stocks.count
  json.items_in_stock category.items.where(order_id:nil).count
  json.items_total category.items.count
end
