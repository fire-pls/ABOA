unless User.any?
  User.create(email:'admin@email.com',password:'123123')
end

unless Stock.any?
  Stock.create(name:'Black Tshirt',description:'Fitted crew neck. 100% cotton',category:Category.create(name:"MENS"))
end
