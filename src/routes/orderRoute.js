const express = require('express');
const path = require('path');
const orderController = require('../controllers/orderController');
const orderRoute = express.Router();

orderRoute.get('/', orderController.index);

orderRoute.get('/detail/:id', orderController.getOrder);

orderRoute.post('/create', orderController.store);

module.exports = orderRoute;