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

exports.getProduct = (req,res,next)=>{
    const prodId = req.params.productId;
    Product.findById(prodId, product=>{
        res.render('shop/product-detail',{
            docTitle: product.title,
            path: '/products',
            product: product
        });
    })   
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

exports.postCart = (req,res,next) =>{
    const prodId = req.body.productId;
    console.log(prodId);
    res.redirect('/cart');
};

exports.getOrder = (req,res,next) => {
    res.render('shop/orders',{
        docTitle:'Order',
        path:'/orders'
    });
}

exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{
        docTitle: 'checkout',
        path:'/checkout'
    });
}

