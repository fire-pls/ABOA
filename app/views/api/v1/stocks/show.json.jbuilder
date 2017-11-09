json.extract! @stock, :id, :name, :description, :quantity_left
json.photos @stock.photos
json.sizes @stock.sizes do |size|
  json.size size
  json.remaining @stock.quantity_left_of_size(size)
  json.quantity @stock.quantity_of_size(size)
end
