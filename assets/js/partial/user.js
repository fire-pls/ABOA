const panel = document.getElementById('user-panel');
const message = document.getElementById('user-message');

const signIn = function(){
  document.getElementById('signin').addEventListener('submit', function(event){
    let email = document.getElementById('email').value;
    let token = document.getElementById('token').value;
    Cookies.set('current_user', { email: email, token: token });
  });
}

const signOut = function(){
  document.getElementById('signout').addEventListener('click', function(event){
    Cookies.remove('current_user');
  });
}

const renderUserPanel = function(){
  panel.innerHTML =
    '<a href="/ABOA/cart">View your cart</a>' +
    '<div id="cart"></div>';
  message.innerHTML = '<hr><a href="/ABOA/" id="signout">Log Out</a>';
}

const renderSignIn = function(){
  panel.innerHTML =
    '<form action="/ABOA/" id="signin">' +
    '<input type="text" id="email" placeholder="email" class="form-control">' +
    '<input type="text" id="token" placeholder="token" class="form-control">' +
    '<input type="submit" value="Sign In">' +
    '</form>';
  message.innerHTML = '<hr><p>Signing in will automatically redirect you to the homepage.</p>';
}


document.addEventListener("DOMContentLoaded", () => {
  console.log('ready boo <3');
  if (currentUser) {
    console.log('you are signed in');
    renderUserPanel();
    signOut();
  } else {
    console.log('you not signed in');
    renderSignIn();
    signIn();
  }
});
