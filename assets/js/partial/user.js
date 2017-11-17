const renderUserPanel = async function(){
  message.innerHTML = '<hr><a href="/ABOA/" id="signout">Log Out</a>';
  if (params.show === undefined){
    panel.innerHTML =
      '<a href="/ABOA/cart">View your cart</a>' +
      '<br><a href="/ABOA/user?show=orders">View your orders</a>' +
      '<div id="cart-items"></div>';
  } else if (params.show === "orders"){
    panel.innerHTML =
      '<style>' +
      'p {margin-bottom:2px;}' +
      'div {margin-bottom:2px;}' +
      'hr {margin:28px 0px 14px 0px;}' +
      '</style>';
    let orders = await retrieveOrders();
    orders.forEach((orderItem)=>{
      let itemId = orderItem.id;
      let shippingCompany = "";
      if (orderItem.shipped === "true") {
        shippingCompany = ` ${orderItem.shipping_company}`;
      }
      panel.insertAdjacentHTML('beforeend',
        '<div>' +
        `<p>Order number ${itemId}</p>` +
        `<div style="background-color:#faa;max-width:300px;" id="items-${itemId}"></div>` +
        `<p>Shipping to: ${orderItem.full_address}</p>` +
        `<p>Paid: ${orderItem.paid} ` +
        `Shipped: ${orderItem.shipped + shippingCompany} ` +
        `Delivered: ${orderItem.delivered}</p>` +
        `<button type="button" value="${itemId}">Pay for this order</button>` +
        '</div>');
      let itemSpace = document.getElementById(`items-${itemId}`);
      orderItem.items.forEach((itemObject)=>{
        itemSpace.insertAdjacentHTML('beforeend', `<p>${itemObject.size + ' ' + itemObject.name}</p>`);
      });
    });
  } else {
    panel.innerHTML = '<p>Your cart will be here</p>';
  }
}

const retrieveOrders = function(){
  return getApi("GET", "orders");
}

const listenSignOut = function(){
  document.getElementById('signout').addEventListener('click', function(event){
    Cookies.remove('current_user');
    Cookies.remove('cart');
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (currentUser) {
    console.log('you are signed in');
    renderUserPanel();
    listenSignOut();
  } else {
    console.log('you not signed in');
    renderSignIn();
    signIn();
  }
});
