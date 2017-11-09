json.extract! @stock, :id, :name, :description
json.sizes do
  json.array! @stock.sizes
end
json.available_sizes do
  json.array! @stock.available_sizes
end
