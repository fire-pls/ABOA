unless User.any?
  User.create(email:'admin@admin.com',password:'123123')
  ['male_user','female_user','random','trevor'].each { |name| User.create(email:"#{name}@gmail.com",password:'123123') }
  User.first.update(admin:true)
end

unless Stock.any?
  Stock.create(
    name:'Black T-shirt',
    description:'Fitted crew neck. Plain black, 100% cotton. See size guide for specific measurements.',
    category:Category.create(name:"men"),
    base_price:1500
  )
  Stock.last.photo_urls = [
    'http://www.repiko.com/wp-content/uploads/2017/01/black-shirt.jpeg',
    'https://images.asos-media.com/products/asos-t-shirt-with-crew-neck-2-pack-save/8626800-1-black'
  ]
  # add items to stock
  {"S" => 10,"M" => 10,"L" => 10,"XL" => 5}.each { |k,v| v.times { |_| Item.create(size:k, stock:Stock.last) } }
  # create another stock+category
  Stock.create(
    name:'Red Blouse',
    description:'Cute casual blouse. Vibrant red, 80% polyester, 20% cotton. See size guide for specific measurements.',
    category:Category.create(name:"women"),
    base_price:2500
  )
  Stock.last.photo_urls = [
    'https://i.pinimg.com/736x/a3/aa/50/a3aa508fbd19a19d5453b3b0085603c9--red-long-sleeve-shirt-bell-sleeve-top.jpg',
    'https://xo.lulus.com/images/product/xlarge/1072186_167458.jpg'
  ]
  #add items to stock
  {"XS" => 10,"S" => 10,"M" => 5}.each { |k,v| v.times { |_| Item.create(size:k, stock:Stock.last) } }
end

#male user adds 3 black shirts to cart and 1 red blouse (for his gf)
Cart.find(2).add_quantity_and_size(2, "L", 1)
Cart.find(2).add_quantity_and_size(1, "M", 1)
Cart.find(2).add_quantity_and_size(2, "XS", 2)

#female user adds 2 red blouses to cart and 1 black shirt (her her bf)
Cart.find(3).add_quantity_and_size(1, "XS", 2)
Cart.find(3).add_quantity_and_size(1, "S", 2)
Cart.find(3).add_quantity_and_size(1, "XL", 1)

#random user adds a bunch of garbage
mess_me_up = rand(15) + 7
mess_me_up.times do |i|
  qty = rand(3) + 1
  stock = [1,2].sample
  stock == 1 ? size = ["S","M","L","XL"].sample : size = ["XS", "S", "M"].sample
  Cart.find(4).add_quantity_and_size(qty, size, stock)
end
