const express = require('express');
const path = require('path');
const productController = require('../controllers/productController');
const productRoute = express.Router();
const multer = require("multer");

const validateRegister = require("../middleware/productValidatorMiddleware");
const validateEdit = require("../middleware/productEditValidatorMiddleware");

// configuracion de multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/img/products");
    },
    filename: (req, file, cb) => {
      const nameFile = `portada_${Date.now()}${path.extname(file.originalname)}`;
      cb(null, nameFile);
    },
});
  
const uploadFile = multer({ storage: storage });

productRoute.get('/', productController.index)

productRoute.get('/detail/:id', productController.details);

productRoute.get('/create', productController.create);

productRoute.post('/create', uploadFile.single("portada"), validateRegister, productController.store);

productRoute.get('/edit/:id', productController.edit);

productRoute.put('/edit/:id', validateEdit, productController.update);

productRoute.delete("/delete/:id", productController.destroy);

module.exports = productRoute;