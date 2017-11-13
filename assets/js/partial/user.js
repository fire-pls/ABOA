document.addEventListener("DOMContentLoaded", () => {
  showChatlog();
});

document.getElementById('signin').addEventListener('submit', function(event){
  let email = document.getElementById('email').value;
  let token = document.getElementById('token').value;
  Cookies.set('current_user', { email: email, token: token });
  console.log('clicked');
});

document.getElementById('signout').addEventListener('click', function(event){
  Cookies.remove('current_user');
});
/*
*/

const panel = document.getElementById('user-panel');
