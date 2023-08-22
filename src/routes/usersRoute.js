const express = require('express');
const userController = require('../controllers/userController');
const userRoute = express.Router();

userRoute.get("/login", userController.login);

userRoute.get("/register", userController.register);

module.exports = userRoute;