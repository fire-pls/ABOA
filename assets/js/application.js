const jsonCookie = function(cookie_obj) {
  if (cookie_obj === undefined) {
    return undefined;
  } else {
    return JSON.parse(cookie_obj);
  }
}


const parseQueryString = function(url) {
  let urlParams = {};
  url.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) {
      urlParams[$1] = $3;
    }
  );
  return urlParams;
}

const params = parseQueryString(location.search);
const currentUser = jsonCookie(Cookies.get('current_user'));
