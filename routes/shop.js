const path = require('path');

const express = require('express');

const routeShop = express.Router();

const shopController = require('../controllers/shop');

routeShop.get('/',shopController.getIndex);

routeShop.get('/products',shopController.getProducts);

routeShop.get('/cart',shopController.getCart);

routeShop.get('/checkout',shopController.getCheckout);

module.exports = routeShop;