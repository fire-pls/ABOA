const skeleton = document.getElementById('cart-items');

const renderCartItems = function(){
  currentCart.items.forEach((cartItem) => {
    skeleton.insertAdjacentHTML('beforeend',
      '<cartitem>' +
      `<p>${cartItem.size} ${cartItem.name}</p>` +
      '<label>Remove?</label>' +
      `<input type="checkbox" id="remove-item" value="${cartItem.id}">` +
      '</cartitem>' +
      '<hr>' );
  });
  skeleton.insertAdjacentHTML('beforeend', '<input id="update-cart" type="button" disabled value="Update Cart">');
  message.insertAdjacentHTML('beforeend', '<input id="checkout-cart" type="button" disabled value="Checkout">');
}

const updateFormAction = function(newAction){
  const form = document.getElementById('cart-form');
  let redirect = form.getAttribute('action');
  if (redirect === "#") {
    form.setAttribute('action', `/ABOA/cart?${newAction}&`);
    form.removeAttribute('disabled')
  } else if (redirect === "/ABOA/cart?") {
    form.setAttribute('action', "#");
    document.getElementById('update-cart').setAttribute('disabled', true);
  } else {
    if (newAction.charAt(0) === '!') {
      let str = `${newAction.slice(1)}=r&`;
      form.setAttribute('action', `${redirect.replace(str, "")}`);
    } else {
      form.setAttribute('action', `${redirect + newAction}&`);
    }
  }
}

const listenCartSelect = function(){
  const cartItems = Array.from(document.getElementsByTagName('cartitem'));
  cartItems.forEach((htmlElement) => {
    let element = htmlElement.lastChild;
    element.addEventListener('click', function(event){
      if (element.checked) {
        updateFormAction(`${element.value}=r`);
      } else {
        updateFormAction(`!${element.value}`);
      }
    });
  });
}

const removeFromCartIfNeeded = function(){
  if (params && currentUser) {
    let heads = new Headers();
    heads.append('Content-Type', 'application/json')
    heads.append('X-User-Email', `${currentUser.email}`);
    heads.append('X-User-Token', `${currentUser.token}`);
    let ids = Object.keys(params);
    let body = JSON.stringify({cart:{item_ids: ids}});
    let reqParams = {
      method: 'PATCH',
      headers: heads,
      body: body
    };
    let fullRequest = new Request(`${apiUrl}cart`, reqParams)
    fetch(fullRequest).then(response => response.json()).then(data => {
      // dont save data if it has error, just re-retrieve cart info
      if (data.hasOwnProperty("error")) {
        Cookies.remove('cart');
        retrieveCart();
      } else {
        Cookies.set('cart', data);
        currentCart = jsonCookie(Cookies.get('cart'));
      }
    });
  }
}

const renderOrderDetails = async function(){
  clearHtml();
  panel.innerHTML =
    '<form action="#" id="order-input">' +
    '<input type="text" id="address" placeholder="Address">' +
    '<input type="text" id="city" placeholder="City">' +
    '<input type="text" id="zip-code" placeholder="Zip Code">' +
    '<select id="country">' +
    '<option value="US">US</option>' +
    '<option value="JP">JP</option>' +
    '</select>' +
    '<input type="submit" value="Confirm Address">' +
    '</form>';
  message.innerHTML = '<p>You will submit payment on the next screen.</p>';
  document.getElementById('order-input').addEventListener('submit', async function(event){
    event.preventDefault();
    let address = document.getElementById('address').value;
    let zipCode = document.getElementById('zip-code').value;
    let city = document.getElementById('city').value;
    let country = document.getElementById('country').value;
    console.log('requesting api right now');
    let apiOrder = await apiCheckout(address, zipCode, city, country);
    console.log('api requested. will now render checkout form');
    renderCheckoutForm(apiOrder);
  });
}
const apiCheckout = function(addr, zipc, city, country){
  // promise syntax
  //return new Promise(resolve =>{});
  return new Promise(resolve =>{
    let url = 'https://aboa-v1.herokuapp.com/api/v1/cart/checkout';
    // permit(:city, :address, :zip_code, :country)
    let body = JSON.stringify({order:{city: city, address: addr, country: country, zip_code: zipc}});
    let heads = new Headers();
    heads.append('X-User-Email', `${currentUser.email}`);
    heads.append('X-User-Token', `${currentUser.token}`);
    heads.append('Content-Type', 'application/json');
    let reqParams = { method: 'POST' };
    reqParams.headers = heads;
    console.log("here's the body of the request");
    console.log(body);
    reqParams.body = body;
    let fullRequest = new Request(url, reqParams)
    console.log('here is the request ur bouta send');
    console.log(fullRequest);
    console.log('commencing actual fetch NOW!!!');
    fetch(fullRequest).then(response => response.json()).then(data => {
      console.log('retrieved.');
      resolve(data);
    });
  });
}

const listenCartCheckout = function(){
  if (currentCart !== undefined){
    checkoutButton = document.getElementById('checkout-cart');
    checkoutButton.removeAttribute('disabled');
    checkoutButton.addEventListener('click', function(event){
      renderOrderDetails();
    })
  }
}

const renderCheckoutForm = function(orderInstance){
  console.log('now inside renderCheckoutForm function');
  let newOrder = orderInstance;
  console.log(newOrder);
  clearHtml();
  if (newOrder.hasOwnProperty('error') || newOrder.hasOwnProperty('errors')) {
    console.log('cart checkout error');
    panel.innerHTML = `<p style="color:#e44">${newOrder.errors}</p>`;
  } else {
    if (Cookies.get('unpaidOrders') === undefined){
      Cookies.set('unpaidOrders', [newOrder]);
    } else {
      let string = Cookies.get('unpaidOrders');
      let arr = jsonCookie(string);
      arr.push(newOrder);
      string = JSON.stringify(arr);
      Cookies.set('unpaidOrders', string);
    }
    console.log('order successfully created, needs payment');
    panel.innerHTML =
      '<h1>Checkout with stripe</h1>' +
      '<form action="#">' +
      '<br>' +
      '<article>' +
      '<label class="amount">' +
      `<span>Amount: ${newOrder.currency.symbol}${newOrder.amount_cents}</span>` +
      '</label>' +
      '</article>' +
      '<div id="stripe-spot"></div>' +
      '</form>';
    let desc = `${newOrder.id}`;
    let amount = `${newOrder.id}`;
    let currency = `${newOrder.amount.currency.name}`;
    let src = createStripeScript(desc, amount, currency);
    document.getElementById('stripe-spot').appendChild(src);
    retrieveCart();
    /*panel.insertAdjacentHTML
      '<script src="https://checkout.stripe.com/checkout.js" class="stripe-button" ' +
        'data-key="pk_test_gjdIyOS55rSzSzGo4C0OgsVl" ' +
        'data-name="ABOA test cart" ' +
        `data-email="${currentUser.email}" ` +
        `data-description="${newOrder.id}" ` +
        `data-amount="${newOrder.amount_cents}" ` +
        `data-currency="${newOrder.amount.currency}"> ` +
      '</script>';*/
  }
}
const createStripeScript = function(desc, amt, curr) {
  let script = document.createElement('script');
  script.src = "https://checkout.stripe.com/checkout.js";
  script.setAttribute('data-key', "pk_test_gjdIyOS55rSzSzGo4C0OgsVl");
  script.setAttribute('class', "stripe-button");
  script.setAttribute('data-name', "ABOA cart");
  script.setAttribute('data-description', `${desc}`);
  script.setAttribute('data-currency', `${curr}`);
  script.setAttribute('data-amount', `${amt}`);
  script.setAttribute('data-email', `${currentUser.email}`);
  return script;
}


document.addEventListener("DOMContentLoaded", () => {
  if (currentUser){
    // console.log('you are signed in');
    removeFromCartIfNeeded();
    retrieveCart();
    renderDynamicLinks();
    renderCartItems();
    listenCartSelect();
    listenCartCheckout();
  } else {
    // console.log('you not signed in');
    renderDynamicLinks();
    renderSignIn();
    panel.insertAdjacentHTML('afterbegin', '<p style="color:#e44">You must be signed in to continue.</p><br>')
    signIn();
  }
});
