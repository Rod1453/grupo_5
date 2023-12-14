const express = require('express');
const userApiController = require('../../controllers/api/userApiController');
const apiUserRoute = express.Router();

apiUserRoute.get('/', userApiController.list);

apiUserRoute.get('/:id', userApiController.show);

apiUserRoute.get('/list/count', userApiController.count);

apiUserRoute.get('/find/lastUser', userApiController.lastUser);

module.exports = apiUserRoute;