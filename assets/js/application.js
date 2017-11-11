let promo = 'general'; // change to your own promo id
const baseUrl = "https://wagon-chat.herokuapp.com/";

function showChatlog() {
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
// Your turn to code!
const clickChannel = document.getElementById('changebtn');
clickChannel.addEventListener('click', (event) => {
  event.preventDefault();
  const newchannel = document.getElementById('newchannel').value;
  promo = newchannel;
  console.log(`now in channel ${promo}`);
  showChatlog();
});

const pressEnter = document.getElementById('your-name');
pressEnter.addEventListener('submit', (event) => {
  event.preventDefault();
  const yourMessage = document.getElementById('your-message').value;
  const yourName = document.getElementById('your-name').value;
  const data = { author: `${yourName}`, content: `${yourMessage}` };
  fetch(`${baseUrl}${promo}/messages`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
});

const clickSubmit = document.getElementById('submitbtn');
clickSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  const yourMessage = document.getElementById('your-message').value;
  const yourName = document.getElementById('your-name').value;
  const data = { author: `${yourName}`, content: `${yourMessage}` };
  fetch(`${baseUrl}${promo}/messages`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  showChatlog();
});

const clickRefresh = document.getElementById('refresh');
clickRefresh.addEventListener('click', (event) => {
  showChatlog();
});

function refresh() {
  showChatlog();
}

document.addEventListener("DOMContentLoaded", () => {
  showChatlog();
  setInterval(refresh, 60000);
});
