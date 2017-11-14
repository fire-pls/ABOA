const renderUserPanel = function(){
  panel.innerHTML =
    '<a href="/ABOA/cart">View your cart</a>' +
    '<div id="cart"></div>';
  message.innerHTML = '<hr><a href="/ABOA/" id="signout">Log Out</a>';
}

const signOut = function(){
  document.getElementById('signout').addEventListener('click', function(event){
    Cookies.remove('current_user');
  });
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
