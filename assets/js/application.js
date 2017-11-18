const jsonCookie = function(cookie_obj) {
  if (cookie_obj === undefined) {
    return undefined;
  } else {
    return JSON.parse(cookie_obj);
  }
}

const isEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}


const parseQueryString = function(url) {
  let urlParams = {};
  url.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) {
      urlParams[$1] = $3;
    }
  );
  return urlParams;
}
const apiUrl = "https://aboa-v1.herokuapp.com/api/v1/";
const params = parseQueryString(location.search);
let currentUser = jsonCookie(Cookies.get('current_user'));
let currentCart = jsonCookie(Cookies.get('cart'));
const currentPath = location.pathname.match(/(\/ABOA\/)(\w*)/)[2] || 'home';
console.log(currentPath);
console.log(params);

////////////////////////////
// html elements for ajax //
////////////////////////////
const panel = document.getElementById(`${currentPath}-panel` || undefined);
const message = document.getElementById(`${currentPath}-message` || undefined);
const ajaxLinks = document.getElementById("ajax-links")
////////////////////////////
/////////// end ////////////
////////////////////////////


const renderSignIn = function(){
  panel.innerHTML =
    '<form action="/ABOA/" id="signin">' +
    '<input type="email" id="email" placeholder="email" class="form-control">' +
    '<input type="text" id="token" placeholder="token" class="form-control">' +
    '<input type="submit" value="Sign In" class="form-submit">' +
    '</form>';
  message.innerHTML = '<hr><p>Signing in will automatically redirect you to the homepage.</p>';
}

const signIn = function(){
  document.getElementById('signin').addEventListener('submit', function(event){
    let email = document.getElementById('email').value;
    let token = document.getElementById('token').value;
    Cookies.set('current_user', { email: email, token: token });
  });
}

const renderDynamicLinks = function(){
  // console.log('getting dynamic links');
  ajaxLinks.innerHTML =
    '<a class="page-link" href="/ABOA/shop">categories</a>';
  if (currentUser) {
    // console.log('signed in links');
    retrieveCart();
    let cartSize = currentCart.items.length || 0;
    ajaxLinks.insertAdjacentHTML('beforeend',
      '<a class="page-link" href="/ABOA/user">profile</a>' +
      `<a class="page-link" href="/ABOA/cart">cart(${cartSize})</a>` )
  } else {
    // console.log('not signed in links');
    ajaxLinks.insertAdjacentHTML('beforeend',
      '<a class="page-link" href="/ABOA/user">sign in</a>' )
  }
}

const retrieveCart = function(){
  // if no cart already
  let invalidCart = (currentCart === undefined || currentCart.hasOwnProperty("error") );
  if (invalidCart && currentUser) {
    // fetch current users cart from api
    let heads = new Headers();
    //// heads.append('Content-Type', 'application/json')
    heads.append('X-User-Email', `${currentUser.email}`);
    heads.append('X-User-Token', `${currentUser.token}`);
    let reqParams = { headers: heads };
    let fullRequest = new Request(`${apiUrl}cart`, reqParams)
    fetch(fullRequest).then(response => response.json()).then(data => {
      Cookies.set('cart', data);
      currentCart = data;
    });
  }
}

const getApi = function(method = "GET",
  directory = "categories",
  body = undefined,
  email = `${currentUser.email}`,
  token = `${currentUser.token}`,
  baseUrl = "https://aboa-v1.herokuapp.com/api/v1/"){
  /*
  console.log(method);
  console.log(directory);
  console.log(body);
  console.log(email);
  console.log(token);
  console.log(baseUrl);
  */
  return new Promise(resolve =>{
    let heads = new Headers();
    heads.append('Content-Type', 'application/json')
    heads.append('X-User-Email', `${email}`);
    heads.append('X-User-Token', `${token}`);
    let reqParams = { headers: heads, method: params.method };
    if (params.body){
      reqParams.body = params.body;
    }
    //console.log(reqParams);
    let fullRequest = new Request(`${baseUrl}${directory}`, reqParams);
    //console.log(fullRequest);
    fetch(fullRequest).then(response => response.json()).then(data => {
      //console.log(data);
      resolve(data);
    });
  });
}

const clearHtml = function(){
  panel.innerHTML = '';
  message.innerHTML = '';
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
      `<form id="stripe-form" action="${apiUrl}orders/${orderInstance.id}/payments/create" method="POST">` +
      '<br>' +
      '<article>' +
      '<label class="amount">' +
      `<span>Amount: ${newOrder.amount.currency.symbol}${newOrder.amount_cents}</span>` +
      '</label>' +
      '</article>' +
      '<div id="stripe-spot"></div>' +
      '</form>';
    let desc = `${newOrder.id}`;
    let amount = `${newOrder.amount_cents}`;
    let currency = `${newOrder.amount.currency.id}`;
    let src = createStripeScript(desc, amount, currency);
    document.getElementById('stripe-spot').appendChild(src);
    retrieveCart();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (currentPath !== 'cart'){
    retrieveCart();
    renderDynamicLinks();
  }
});
