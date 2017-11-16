const requestApi = function(size = undefined, qty = undefined, idStock = undefined){
  // if size and qty and stock id provided, change to PATCH request
  return new Promise(resolve =>{
    console.log('begin api request');
    let body = undefined;
    let method = 'GET';
    if (size && qty && idStock){
      body = JSON.stringify({size:{size: size, qty: parseInt(qty), stock_id: parseInt(idStock)}});
      method = 'PATCH';
    }
    let reqParams = {
      method: method
    }
    let stock = parseInt(params.stock);
    let category = params.category;
    let destination = `categories`;
    if (category) {
      destination = `c/${category}`;
      if (stock) {
        destination += `/${stock}`;
      }
    }
    if (currentCart && currentUser && body) {
      let heads = new Headers();
      heads.append('X-User-Email', `${currentUser.email}`);
      heads.append('X-User-Token', `${currentUser.token}`);
      heads.append('Content-Type', 'application/json');
      reqParams.headers = heads;
      reqParams.body = body;
      destination = 'cart';
    }
    let fullRequest = new Request(`${apiUrl}${destination}`, reqParams)
    fetch(fullRequest).then(response => response.json()).then(data => {
      if (method === 'PATCH') {
        Cookies.set('cart', data);
        currentCart = jsonCookie(Cookies.get('cart'));
        resolve(console.log('you patched the cart'));
      } else {
        console.log('you query stock');
        console.log(data);
        resolve(data);
      }
    });
  });
}

const renderStoreCategories = async function(){
  console.log('render all categories');
  let categories = await requestApi();
  categories.forEach((categoryReference) =>{
    panel.insertAdjacentHTML('afterbegin',
      `<div style="background-color:#faa;" id="category-link" value="${categoryReference.name}">` +
      `<p>${categoryReference.name}</p>` +
      `<p>Listed Items: ${categoryReference.article_count}</p>` +
      '</div>');
  });
  listenCategorySelect();
}

const listenCategorySelect = function(){
  document.querySelectorAll('#category-link').forEach((htmlElement) =>{
    //when selected, query api for that item & rerender html
    htmlElement.addEventListener('click', ()=>{
      let choice = htmlElement.getAttribute('value');
      params.category = `${choice}`;
      window.history.pushState("string", "Title", `${location.href}?category=${choice}`);
      clearHtml();
      renderCategoryItems();
    });
  });
}

const renderCategoryItems = async function(){
  console.log('render category items');
  let categoryItems = await requestApi();
  categoryItems.forEach((itemReference) =>{
    panel.insertAdjacentHTML('afterbegin',
      `<div style="background-color:#faa;" id="item-link" value="${itemReference.id}">` +
      `<p>${itemReference.name}</p>` +
      `<p>${itemReference.price_formatted}</p>` +
      '</div>');
  });
  listenItemSelect();
}

const listenItemSelect = function(){
  document.querySelectorAll('#item-link').forEach((htmlElement) =>{
    //when selected, query api for that item & rerender html
    htmlElement.addEventListener('click', ()=>{
      let choice = parseInt(htmlElement.getAttribute('value'));
      params.stock = parseInt(`${choice}`);
      window.history.pushState("string", "Title", `${location.href}&stock=${choice}`);
      clearHtml();
      renderItem();
    });
  });
}

const clearHtml = function(){
  panel.innerHTML = '';
  message.innerHTML = '';
}

const renderItem = async function(){
  let data = await requestApi();
  let price = data.price_formatted;
  let sizes = data.sizes;
  let sizeHash = {};
  sizes.forEach((sizeItem)=>{
    let sizeStr = sizeItem.size;
    sizeHash.sizeStr = sizeItem.remaining;
  })
  let photos = data.photos;
  params.stock = parseInt(data.id);
  panel.innerHTML =
    `<h1>${data.name}</h1>`,
    `<p>${data.description}</p>`;
  photos.forEach((cloudinaryPhoto) => {
    panel.insertAdjacentHTML('afterbegin',
      `<img src="https://res.cloudinary.com/dbqymsl8h/image/upload/${cloudinaryPhoto.path}">` );
  });
  message.innerHTML =
  '<hr>' +
  '<div id="price-place">' +
  `<h3>Price: ${data.price_formatted}</h3>` +
  '<div id="size-place"></div>' +
  '</div>' +
  '<form id="item-form" action="/ABOA/cart">' +
  '<div id="size-options"></div>' +
  '<input type="number" min="0" max="0" id="item-qty">' +
  '<input type="submit" value="Add to Cart" disabled>' +
  '</form>';
  sizes.forEach((sizeObject) =>{
    let theSize = sizeObject.size;
    document.getElementById('size-options').insertAdjacentHTML('beforeend',
      `<input type="radio" name="size-select" id="size-option" value="${theSize}">${theSize}</radio>`);
    document.getElementById('size-place').insertAdjacentHTML('beforeend',
      `<p>${theSize}: ${sizeObject.reamining} available</p>`);
    listenSizeSelect(sizeHash);
    listenAddCart();
  });
}

const listenSizeSelect = function(sizeHash){
  const sizeSelectors = document.querySelectorAll('#size-option');
  sizeSelectors.forEach((htmlElement) =>{
    htmlElement.addEventListener('click', () => {
      let maxVal = document.getElementById('item-qty');
      let sizeQuery = htmlElement.value
      maxVal.setAttribute('max', `${sizeHash.sizeQuery}`);
      // below simply removes disabled checkout cart
      let button = document.querySelector('input[type="submit"]');
      if (button.hasAttribute('disabled')) {
        button.removeAttribute('disabled');
      }
    });
  })
}

const listenAddCart = function(){
  document.getElementById('item-form').addEventListener('submit', function(event){
    event.preventDefault();
    let size = document.querySelector('input[id="size-option"]:checked').value;
    let qty = parseInt(document.getElementById('item-qty').value);
    let stock = params.stock;
    requestApi(size, qty, stock);
  });
}

const initialPageContent = function(){
  if (isEmpty(params)) {
    console.log('no params given, rendering all categories');
    renderStoreCategories();
  } else if (params.hasOwnProperty('category') && params.hasOwnProperty('stock')){
    console.log('category and stock given, rendering item');
    renderItem();
  } else {
    console.log('category given, rendering all items from category');
    renderCategoryItems();
    listenItemSelect();
  }
}


document.addEventListener("DOMContentLoaded", () => {
  initialPageContent();
});
