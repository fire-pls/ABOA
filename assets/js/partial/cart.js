//const baseUrl = "http://localhost:3000/api/v1";

const renderCartItems = function(){
  const skeleton = document.getElementById('cart-items');
  let data = Cookies.get('cart') || retrieveCart();
  let cartItemCount = 0
  data.items.forEach((cartItem) => {
    // if items to show
    if (cartItem.items !== undefined) {
      // show each cart item
      cartItemCount += 1;
      skeleton.insertAdjacentHTML('beforeend',
      `<cartitem id="item-id${cartItem.id}">` +
      // implement sort by SKU later
      //`<input type="number" id="remove-item-id${cartItemCount}" min="0" max="#{}" value="0">` +
      //`<input type="checkbox" id="remove-all-id${cartItemCount}">` +
      //////////////////////////////
      `<p>${cartItem.size} ${cartItem.name}</p>` +
      '<label>Remove?</label>' +
      `<input type="checkbox" id="remove-item" value="${cartItem.id}">` +
      '</cartitem>' +
      '<hr>' );
    }
  });

const renderCartSkeleton = function(){
  let cartParams = "";
  panel.innerHTML =
    `<form action="/ABOA/cart?${cartParams}" id="cart-form">` +
    '<div id="cart-items"></div>' +
    '<input type="submit" value="Checkout" class="form-submit">' +
    '</form>';
  message.innerHTML =
    '<hr><p>Checking out relies on cookies.</p>';
}

const getCartParams = function(){
  const cartItems = document.getElementsByTagName('cartitem');
  cartItems.forEach((htmlElement) => {
    console.log();
  })
}

const submitCart = function(){
  let count = 0;
  document.getElementById('cart-form').addEventListener('submit', function(event){
    event.preventDefault();
    getCartParams();
  });
}


document.addEventListener("DOMContentLoaded", () => {
  if (currentUser) {
    // console.log('you are signed in');
    renderCartSkeleton();
    renderCartItems();
  } else {
    // console.log('you not signed in');
    renderSignIn();
    signIn();
  }
});
