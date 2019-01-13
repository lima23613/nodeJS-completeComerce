const path = require('path');

const express = require('express');

//const rootDir = require('../util/path');
const prodController = require('../controllers/products');

const router = express.Router();


//-> /admin/add-product
router.get('/add-product',prodController.getAddproduct);
// -> /admin/product
router.post('/add-product',prodController.postAddproduct);

module.exports = router;