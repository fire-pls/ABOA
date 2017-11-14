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
      data.forEach((cartItem) => {
        cartItemCount += 1;
        skeleton.insertAdjacentHTML('beforeend',
        `<div id="cart-item-${cartItemCount}">` +
        '<input type="">' +
        '</div>' +
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

const checkoutCart = function(){
  document.getElementById('cart-form').addEventListener('submit', function(event){
    event.preventDefault();
    let email = document.getElementById('email').value;
    let token = document.getElementById('token').value;
    let dir = document.getElementById('directory').value;
    let rbody = document.getElementById('request-body').value;
    let rMethod = document.getElementById('request-method').value;
    let radio = document.getElementById('remove-all').checked;
    console.log(radio);
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
