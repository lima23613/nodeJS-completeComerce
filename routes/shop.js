const path = require('path');

const express = require('express');

const routeShop = express.Router();

const shopController = require('../controllers/shop');

routeShop.get('/',shopController.getIndex);

routeShop.get('/products',shopController.getProducts);

routeShop.get('/product/:productId',shopController.getProduct);

routeShop.get('/cart',shopController.getCart);

routeShop.post('/cart',shopController.postCart);

routeShop.post('/cart-delete-item',shopController.postDeleteCart);

routeShop.get('/orders',shopController.getOrder);

routeShop.get('/checkout',shopController.getCheckout);

module.exports = routeShop;