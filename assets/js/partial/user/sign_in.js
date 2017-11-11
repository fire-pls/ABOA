Cookies.set('test', "poopoo");
console.log("now heres the cookies");
cookie = Cookies.get();
console.log(cookie);
console.log("removing all cookies");
Cookies.remove('test');
console.log("now heres the cookies");
cookie = Cookies.get();
console.log(cookie);

//////////

// const baseUrl = "https://aboa-v1.herokuapp.com/api/v1/"; production
const baseUrl = "http://localhost:3000/api/v1/";

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
const clickChannel = document.getElementById('changebtn');
clickChannel.addEventListener('click', (event) => {
  event.preventDefault();
  const newchannel = document.getElementById('newchannel').value;
  promo = newchannel;
  console.log(`now in channel ${promo}`);
  showChatlog();
});

const submitForm = document.getElementById('token');
submitForm.addEventListener('submit', (event) => {
  //event.preventDefault(); re-enable if cookie not saved.
  const email = document.getElementById('email').value;
  const token = document.getElementById('token').value;
  const data = { user: { `${yourName}`, content: `${yourMessage}` } };
  fetch(`${baseUrl}${promo}/messages`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
});
