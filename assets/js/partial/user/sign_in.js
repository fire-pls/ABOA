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
  let directory = document.getElementById('directory').value;
  console.log(email);
  console.log(token);
  fetch(
    `https://aboa-v1.herokuapp.com/api/v1/${directory}`/*,
    {
      method: 'GET',
      headers:
        {
          'X-User-Email': `${email}`,
          'X-User-Token': `${token}`
        }
    }*/
  ).then(response => response.json()).then(data => {
      (console.log(data));
    });
});

fetch('https://aboa-v1.herokuapp.com/api/v1/categories')
  .then(response => response.json())
  .then(data => {
    (console.log(data));
});
