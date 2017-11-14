//const baseUrl = "http://localhost:3000/api/v1";

const renderCartItems = function(){
  const skeleton = document.getElementById('cart-items');
  // fetch current users cart from api
  let email = currentUser.email;
  let token = currentUser.token;
  let heads = new Headers();
  //// heads.append('Content-Type', 'application/json')
  heads.append('X-User-Email', `${email}`);
  heads.append('X-User-Token', `${token}`);
  let reqParams = { headers: heads }
  let fullRequest = new Request(`${apiUrl}cart`, reqParams)
  fetch(fullRequest).then(response => response.json()).then(data => {
  // iterate over each cart item
    let cartItemCount = 0;
    console.log(data);
      data.items.forEach((cartItem) => {
        cartItemCount += 1;
        skeleton.insertAdjacentHTML('beforeend',
        `<cartitem id="item-id${cartItemCount}">` +
        `<input type="number" id="remove-item-id${cartItemCount}" min="0" max="#{}" value="0">` +
        `<input type="checkbox" id="remove-all-id${cartItemCount}">` +
        '</cartitem>' +
        '<hr>' )
      });
    }
  );
  // show each cart item
}

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
