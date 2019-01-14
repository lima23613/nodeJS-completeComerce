const path = require('path');

const express = require('express');

const routeShop = express.Router();

const shopController = require('../controllers/products');

routeShop.get('/',shopController.getShop);

routeShop.get('/products');

routeShop.get('/cart');

routeShop.get('/checkout');

module.exports = routeShop;