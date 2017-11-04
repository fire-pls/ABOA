if User.blank?
  User.create(email:'admin@email.com',password:'123123')
end

if Stock.blank?
  Stock.create(name:'Black Tshirt',description:'Fitted crew neck. 100% cotton',category:Category.create(name:"MENS"))
end
