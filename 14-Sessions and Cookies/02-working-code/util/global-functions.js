exports.getCookie = req => {
  const loggedInCookie =
    req
      .get("Cookie")
      .split(";")[1]
      .trim()
      .split("=")[1] == 'true';
    return loggedInCookie;
};
