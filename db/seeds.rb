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
  urls = [
    'https://fire-pls.github.io/profile/images/trainspotting.jpg',
    'http://www.repiko.com/wp-content/uploads/2017/01/black-shirt.jpeg'
  ]
  Stock.last.photo_urls = urls
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
  Cart.find(id).add_quantity_and_size(2, "XS", 1)
  Cart.find(id).add_quantity_and_size(2, "S", 1)
  Cart.find(id).add_quantity_and_size(2, "M", 1)
  Cart.find(id).add_quantity_and_size(1, "L", 1)
  Cart.find(id).add_quantity_and_size(1, "XL", 1)
end
