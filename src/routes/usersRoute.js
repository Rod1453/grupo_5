const express = require('express');
const userController = require('../controllers/userController');
const userRoute = express.Router();

const loginValidate = require('../middleware/loginValidatorMiddleware');
const guestMiddleware = require("../middleware/guestMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
//
const userValidator = require("../middleware/UserValidatorMiddleware");
userRoute.post("/register",userValidator,userController.save);
//

userRoute.get("/register",guestMiddleware, userController.register);

userRoute.get("/login", guestMiddleware, userController.login);

userRoute.post("/loginProcess", loginValidate, userController.loginProcess);

userRoute.get("/profile", authMiddleware, userController.profile);

userRoute.get("/logout", userController.logout);

module.exports = userRoute;