
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
}

const updateFormAction = function(newAction){
  const form = document.getElementById('cart-form');
  let redirect = form.getAttribute('action');
  if (redirect === "#") {
    form.setAttribute('action', `/ABOA/cart?${newAction}&`);
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
    console.log(htmlElement);
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


document.addEventListener("DOMContentLoaded", () => {
  if (currentUser){
    // console.log('you are signed in');
    renderCartItems();
    listenCartSelect();
  } else {
    // console.log('you not signed in');
    renderSignIn();
    panel.insertAdjacentHTML('afterbegin', '<p style="color:#e44">You must be signed in to continue.</p><br>')
    signIn();
  }
});
