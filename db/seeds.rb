unless User.any?
  ['admin','trevor'].each do |name|
    User.create(email:"#{name}@email.com",password:'123123')
  end
end

unless Stock.any?
  Stock.create(name:'Black Tshirt',description:'Fitted crew neck. 100% cotton',category:Category.create(name:"MENS"))
  {
    "XS" => 5,
    "S" => 5,
    "M" => 10,
    "L" => 5,
    "XL" => 3
  }.each do |k,v|
    v.times { |_| Item.create(size:k, stock:Stock.last) }
  end
end

Cart.first.add_quantity_and_size(2, "XL", Stock.first)
Cart.first.add_quantity_and_size(3, "M", Stock.first)
Cart.last.add_quantity_and_size(2, "XL", Stock.first)
Cart.last.add_quantity_and_size(3, "M", Stock.first)
