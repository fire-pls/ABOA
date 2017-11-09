json.extract! @stock, :id, :name, :description
json.sizes do
  json.array! @stock.sizes
end
