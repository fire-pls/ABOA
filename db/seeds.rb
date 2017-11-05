unless User.any?
  ['admin','trevor'].each do |name|
    User.create(email:"#{name}@email.com",password:'123123')
  end
end

unless Stock.any?
  Stock.create(name:'Black Tshirt',description:'Fitted crew neck. 100% cotton',category:Category.create(name:"MENS"))
  {
    "S" => 5,
    "M" => 3,
    "L" => 5,
    "XL" => 1
  }.each do |k,v|
    v.times { |_| Item.create(size:k, stock:Stock.last) }
  end
end

Cart.first.add_quantity_and_size(2, "M", Stock.first)
Cart.last.add_quantity_and_size(2, "M", Stock.first)
