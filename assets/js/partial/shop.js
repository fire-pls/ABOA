const renderStoreCategories = function(){
  console.log('render all categories');
  let allCategories = requestApi();
  allCategories.forEach((categoryReference) =>{
    panel.insertAdjacentHTML('afterbegin',
      `<div style="background-color:#faa;" id="category-link" value="${categoryReference.id}">` +
      `<p>${categoryReference.name}</p>` +
      `<p>Listed Items: ${categoryReference.article_count}</p>` +
      '</div>');
  });
}

const listenCategorySelect = function(){
  document.querySelectorAll('category-link').forEach((htmlElement) =>{
    //when selected, query api for that item & rerender html
    htmlElement.addEventListener('click', ()=>{
      let choice = htmlElement.value;
      params.category = `${choice}`;
      window.history.pushState("string", "Title", `${location.href}?category=${choice}`);
      clearHtml();
      renderItem();
    });
  });
}

const renderCategoryItems = function(){
  console.log('render category items');
  let categoryItems = requestApi();
  categoryItems.forEach((itemReference) =>{
    panel.insertAdjacentHTML('afterbegin',
      `<div style="background-color:#faa;" id="item-link" value="${itemReference.id}">` +
      `<p>${itemReference.name}</p>` +
      `<p>${itemReference.price_formatted}</p>` +
      '</div>');
  });
}

const listenItemSelect = function(){
  document.querySelectorAll('item-link').forEach((htmlElement) =>{
    //when selected, query api for that item & rerender html
    htmlElement.addEventListener('click', ()=>{
      let choice = htmlElement.value;
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

const renderItem = function(){
  let data = requestApi();
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
  `<h3>Price: ${data.price}</h3>` +
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
      `<input type="radio" id="size-option" value="${theSize}">${theSize}</radio>`);
    document.getElementById('size-place').insertAdjacentHTML('beforeend',
      `<p>${theSize}: ${sizeObject.qty_left} available</p>`);
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
    renderStoreCategories();
    listenCategorySelect();
  } else if (params.hasOwnProperty('category') && params.hasOwnProperty('stock')){
    renderItem();
  } else {
    renderCategoryItems();
    listenItemSelect();
  }
}

const requestApi = function(size, qty, idStock){
  // if size and qty and stock id provided, change to PATCH request
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
    } else {
      return data;
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  initialPageContent();
});
