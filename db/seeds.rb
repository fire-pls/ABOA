unless User.blank?
  User.create(email:'admin@email.com',password:'123123')
end

unless Stock.blank?
  Stock.create(name:'Black Tshirt',description:'Fitted crew neck. 100% cotton',category:Category.create(name:"MENS"))
  Item.create(stock:Stock.first,size:'S')
end
