exports.getCookie = req => {
  const loggedInCookieExists = req
      .get("Cookie")
      .split(";")    
      .find(cookie => {
        console.log('cookie: ', cookie)
        if(cookie) return cookie.trim().split("=")[0] == 'loggedIn'                
      })
  console.log('loggedInCookieExists',loggedInCookieExists);
  const loggedInCookie = loggedInCookieExists ? 
    req
      .get("Cookie")
      .split(";")[1]
      .trim()
      .split("=")[1] == 'true' : 'false';
    return loggedInCookie;
};
