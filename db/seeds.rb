unless User.any?
  ['admin','person1','person2','person3','person4','person5','trevor'].each do |name|
    User.create(email:"#{name}@mail.com",password:'123123')
  end
end
User.first.update(admin:true)

unless Stock.any?
  Stock.create(name:'Black T-shirt',description:'Fitted crew neck. Plain black, 100% cotton',category:Category.create(name:"men"))
  {
    "XS" => 10,
    "S" => 10,
    "M" => 10,
    "L" => 10,
    "XL" => 5
  }.each do |k,v|
    v.times { |_| Item.create(size:k, stock:Stock.last) }
  end
  Stock.create(name:'Red Blouse',description:'Cute casual blouse.',category:Category.create(name:"women"))
   {
    "XS" => 10,
    "S" => 10,
    "M" => 3,
    "L" => 3,
    "XL" => 2
  }.each do |k,v|
    v.times { |_| Item.create(size:k, stock:Stock.last) }
  end
end

[2,3,4,5,6].each do |id|
  Cart.find(id).add_quantity_and_size(2, "XS", Stock.first)
  Cart.find(id).add_quantity_and_size(2, "S", Stock.first)
  Cart.find(id).add_quantity_and_size(2, "M", Stock.first)
  Cart.find(id).add_quantity_and_size(1, "L", Stock.first)
  Cart.find(id).add_quantity_and_size(1, "XL", Stock.first)
end
