const express = require('express');
const userApiController = require('../../controllers/api/userApiController');
const apiUserRoute = express.Router();

apiUserRoute.get('/', userApiController.list);

apiUserRoute.get('/:id', userApiController.show);

module.exports = apiUserRoute;