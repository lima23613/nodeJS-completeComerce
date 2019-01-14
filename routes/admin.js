const path = require('path');

const express = require('express');

//const rootDir = require('../util/path');
const prodController = require('../controllers/products');

const router = express.Router();


//-> /admin/add-product
router.get('/admin/add-product',prodController.getAddproduct);

router.get('/admin/products');
// -> /admin/product
router.post('/admin/add-product',prodController.postAddproduct);

module.exports = router;