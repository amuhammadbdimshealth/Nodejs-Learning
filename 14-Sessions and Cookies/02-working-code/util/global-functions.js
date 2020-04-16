const store = require('../app');
exports.getCookie = (req) => {
  const loggedInCookieExists = req.get("Cookie")
    ? req
        .get("Cookie")
        .split(";")
        .find((cookie) => {
          console.log("1-cookie: ", cookie);
          if (cookie) return cookie.trim().split("=")[0] == "loggedIn";
        })
    : false;
  console.log("10-loggedInCookieExists", loggedInCookieExists);
  const loggedInCookie = loggedInCookieExists
    ? req
        .get("Cookie")
        .split(";")
        .find((cookie) => {
          console.log("2-cookie: ", cookie);
          if (cookie) return cookie.trim().split("=")[0] == "loggedIn";
        })
    : null;
  const loggedInCookieValue = loggedInCookieExists
    ? loggedInCookie.trim().split("=")[1] == "true"
    : false;
  return loggedInCookieValue;
};

/*
exports.getsessionUser = (req) => {
  return store.get(req.session.id, ()=>console.log('AAAA'))
}
*/