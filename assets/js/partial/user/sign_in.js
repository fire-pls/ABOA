//////////

const baseUrl = "https://aboa-v1.herokuapp.com/api/v1/";// production
//const baseUrl = "http://localhost:3000/api/v1";

function showCart() {
  fetch(`${baseUrl}${promo}/messages`)
    .then(response => response.json())
    .then((data) => {
      const log = document.getElementById('messagebox');
      console.log(data);
      let msgcnt = 0;
      log.innerHTML = '';
      data.messages.forEach((hashItem) => {
        msgcnt += 1;
        log.insertAdjacentHTML('afterbegin', `<p class="msg-content">${hashItem.id}: <strong>${hashItem.content}</strong></p><p class="msg-author">--${hashItem.author}</p>`);
        document.querySelector('title').innerHTML = `${msgcnt}`;
      });
    });
}

document.getElementById('signin').addEventListener('submit', function(event){
  event.preventDefault();
  let email = document.getElementById('email').value;
  let token = document.getElementById('token').value;
  let dir = document.getElementById('directory').value;
  let rbody = document.getElementById('request-body').value;
  let rMethod = document.getElementById('request-method').value
  console.log(email);
  console.log(token);
  let heads = new Headers();
  heads.append('X-User-Email', `${email}`);
  heads.append('X-User-Token', `${token}`);
  let reqParams = {
    method: `${rMethod}`,
    headers: heads
  }
  if (rMethod !== "GET"){
    reqParams.body = rbody;
  }
  let fullRequest = new Request(`http://localhost:3000/api/v1/${dir}`, reqParams)
  fetch(fullRequest).then(response => response.json()).then(data => {
      (console.log(data));
    });
});

fetch('http://localhost:3000/api/v1/categories')
  .then(response => response.json())
  .then(data => {
    (console.log(data));
});
