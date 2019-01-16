const path = require('path');

const express = require('express');

//const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

const router = express.Router();


//-> /admin/add-product
router.get('/admin/add-product',adminController.getAddproduct);

router.get('/admin/products',adminController.getProducts);
// -> /admin/product
router.post('/admin/add-product',adminController.postAddproduct);

module.exports = router;