const renderUserPanel = async function(){
  message.innerHTML = '<hr><a href="/ABOA/" id="signout">Log Out</a>';
  if (params.show === undefined){
    panel.innerHTML =
      '<a href="/ABOA/cart">View your cart</a>' +
      '<br><a href="/ABOA/user?show=orders">View your orders</a>' +
      '<div id="cart-items"></div>';
  } else if (params.show === "orders"){
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
        `<div id="items-${itemId}"></div>` +
        `<p>Shipping to: ${orderItem.full_address}</p>` +
        `<p>Paid: ${orderItem.paid}</p>` +
        `<p>Shipped: ${orderItem.shipped + shippingCompany}</p>` +
        `<p>Delivered: ${orderItem.delivered}</p>` +
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
