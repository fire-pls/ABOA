unless User.any?
  ['admin','trevor'].each do |name|
    User.create(email:"#{name}@email.com",password:'123123')
  end
end

unless Stock.any?
  Stock.create(name:'Black Tshirt',description:'Fitted crew neck. 100% cotton',category:Category.create(name:"MENS"))
  Item.create(stock:Stock.first,size:'S')
  Item.create(stock:Stock.first,size:'S')
  Item.create(stock:Stock.first,size:'S')
  Item.create(stock:Stock.first,size:'S')
  Item.create(stock:Stock.first,size:'M')
  Item.create(stock:Stock.first,size:'M')
  Item.create(stock:Stock.first,size:'M')
  Item.create(stock:Stock.first,size:'L')
  Item.create(stock:Stock.first,size:'L')
  Item.create(stock:Stock.first,size:'L')
  Item.create(stock:Stock.first,size:'L')
  Item.create(stock:Stock.first,size:'L')
  Item.create(stock:Stock.first,size:'L')
end

