const express = require('express');
const productController = require('../controllers/productController');
const productRoute = express.Router();
const multer = require("multer")

productRoute.get('/', productController.index)

productRoute.get('/detail/:id', productController.details);

productRoute.get('/create', productController.create);

module.exports = productRoute;