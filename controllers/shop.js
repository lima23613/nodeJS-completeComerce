const Product = require('../models/product');
const Cart = require('../models/cart');

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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const carProductData = cart.products.find(prod=>prod.id === product.id);
                if(carProductData){
                    cartProducts.push({productData: product, Qty: carProductData.qty});
                }
            }
            res.render('shop/cart', {
                docTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts 
            });
        });
    });    
}

exports.postCart = (req,res,next) =>{
    const prodId = req.body.productId;
    Product.findById(prodId,product =>{
        Cart.addProduct(prodId,product.price);
    })
    res.redirect('/cart');
};

exports.postDeleteCart = (req,res,next)=>{
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId,product.price);
        res.redirect('/cart')
    });     
}


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

