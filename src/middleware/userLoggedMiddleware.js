const path = require("path");
const fs = require("fs");
const usersJson = fs.readFileSync(path.join(__dirname,"../data/user.json"),"utf-8");
const users = JSON.parse(usersJson);

const userLoggedMiddleware = (req, res, next) => {
  res.locals.isLogged = false;
  if (req.cookies.email) {
    const userFromCookie = users.find(user => user.email == req.cookies.email);

    if (userFromCookie) {
      req.session.userLogged = userFromCookie;
    }
  }

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
};

module.exports = userLoggedMiddleware;