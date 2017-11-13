const baseUrl = "https://aboa-v1.herokuapp.com/api/v1/";// production
//const baseUrl = "http://localhost:3000/api/v1";

document.getElementById('signin').addEventListener('submit', function(event){
  event.preventDefault();
  let email = document.getElementById('email').value;
  let token = document.getElementById('token').value;
  let dir = document.getElementById('directory').value;
  let rbody = document.getElementById('request-body').value;
  let rMethod = document.getElementById('request-method').value;
  let radio = document.getElementById('remove-all').checked;
  console.log(radio);
  let heads = new Headers();
  heads.append('Content-Type', 'application/json')
  heads.append('X-User-Email', `${email}`);
  heads.append('X-User-Token', `${token}`);
  let reqParams = {
    method: `${rMethod}`,
    headers: heads
  }
  if (rMethod !== "GET"){
    reqParams.body = rbody;
  }
  let fullRequest = new Request(`${baseUrl}${dir}`, reqParams)
  fetch(fullRequest).then(response => response.json()).then(data => {
      (console.log(data));
    });
});
