const path = require('path');

const express = require('express');

const routeShop = express.Router();

const shopController = require('../controllers/products');

routeShop.get('/',shopController.getShop);
/*app.use('/',(req,res,next)=>{
    console.log('in the another middleware');
    res.send('<h1>Hello from middleware</h1>');
    //...
});*/
module.exports = routeShop;