const express = require('express');
const mainController = require('../controllers/mainController');
const mainRoute = express.Router();

mainRoute.get("/", mainController.home);

module.exports = mainRoute;