const express = require('express');
const path = require('path');
const cartController = require('../controllers/cartController');
const cartRoute = express.Router();

cartRoute.get('/', cartController.index);

cartRoute.post('/create', cartController.store);

cartRoute.delete('/delete/:id', cartController.destroy)

module.exports = cartRoute;