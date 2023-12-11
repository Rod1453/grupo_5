const express = require('express');
const path = require('path');
const productApiController = require('../../controllers/api/productApiController');
const apiProductRoute = express.Router();

apiProductRoute.get('/', productApiController.list);

apiProductRoute.get('/:id', productApiController.show);

apiProductRoute.post('/', productApiController.store);

apiProductRoute.put('/:id', productApiController.update);

apiProductRoute.delete('/:id', productApiController.destroy);

apiProductRoute.get('/sold/acountSoldAndOrders', productApiController.acountSoldAndOrders);

apiProductRoute.get('/top/last5Products', productApiController.last5Products);

module.exports = apiProductRoute;