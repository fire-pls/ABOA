json.array! @categories do |category|
  json.extract! category, :name, :id
  json.items category.stocks.count
end
