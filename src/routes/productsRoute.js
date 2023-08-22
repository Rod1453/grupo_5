const express = require('express');
const productController = require('../controllers/productController');
const productRoute = express.Router();

productRoute.get('/', productController.index)

productRoute.get('/details', productController.details);

productRoute.get('/create', productController.create);

module.exports = productRoute;