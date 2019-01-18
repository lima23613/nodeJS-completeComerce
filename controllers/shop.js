const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list',
        {
            prods: products,
            docTitle: 'All products',
            path: '/products',
            hasProduct: products.length > 0,
            shopActive: true,
            productCSS: true
        });
    });
};

exports.getIndex = (req,res,next)=>{
    Product.fetchAll(products => {
        res.render('shop/index',
        {
            prods:products,
            docTitle:'shop',
            path:'/'           
        });
    });
};

exports.getCart = (req,res,next)=>{
    res.render('shop/cart',{
        docTitle:'Your Cart',
        path:'/cart'
    });
}

exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{
        docTitle: 'checkout',
        path:'/checkout'
    });
}

