unless User.blank?
  User.create(email:'admin@email.com',password:'123123')
end

unless Stock.blank?
  Stock.create(name:'Black Tshirt',description:'Fitted crew neck. 100% cotton',category:Category.create(name:"MENS"))
  Order.create(address:"1016 E San Antonio",city:"Long Beach", zip_code:"90807",country:"US", user:User.first)
  Item.create(stock:Stock.first,size:'S',order:Order.first)
  Item.create(stock:Stock.first,size:'S')
  Item.create(stock:Stock.first,size:'M')
  Order.create(address:'980 E San Antonio',city:"Long Beach",zip_code:'90807',country:'US',user:User.first)
end

